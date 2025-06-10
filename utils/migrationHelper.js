const mongoose = require('mongoose');
const { getQuestionModel } = require('../models/Question');

// Migration function to move data from single collection to multiple collections
async function migrateToSeparateCollections(oldCollectionName = 'questions') {
  try {
    console.log('🚀 Starting migration from single collection to separate collections...');
    
    // Connect to the old collection
    const OldQuestionSchema = new mongoose.Schema({}, { strict: false });
    const OldQuestion = mongoose.model('OldQuestion', OldQuestionSchema, oldCollectionName);
    
    // Check if old collection exists
    const collections = await mongoose.connection.db.listCollections({ name: oldCollectionName }).toArray();
    if (collections.length === 0) {
      console.log(`❌ Collection '${oldCollectionName}' not found`);
      return;
    }

    // Get total count
    const totalQuestions = await OldQuestion.countDocuments();
    console.log(`📊 Found ${totalQuestions} total questions to migrate`);

    if (totalQuestions === 0) {
      console.log('⚠️ No questions found to migrate');
      return;
    }

    // Get all unique subject-standard combinations
    const combinations = await OldQuestion.aggregate([
      {
        $group: {
          _id: {
            subjectName: '$subjectName',
            standard: '$standard'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.subjectName': 1, '_id.standard': 1 }
      }
    ]);

    console.log(`📋 Found ${combinations.length} subject-standard combinations:`);
    combinations.forEach(combo => {
      console.log(`   - ${combo._id.subjectName} (Standard ${combo._id.standard}): ${combo.count} questions`);
    });

    let totalMigrated = 0;
    const migrationResults = [];

    // Migrate data for each combination
    for (const combo of combinations) {
      const { subjectName, standard } = combo._id;
      console.log(`\n🔄 Migrating ${subjectName} - Standard ${standard}...`);
      
      try {
        // Get questions for this combination in batches
        const batchSize = 1000;
        let skip = 0;
        let batchMigrated = 0;

        const NewQuestionModel = getQuestionModel(subjectName, standard);

        while (true) {
          const questions = await OldQuestion
            .find({ subjectName, standard })
            .skip(skip)
            .limit(batchSize)
            .lean();

          if (questions.length === 0) break;

          // Clean questions - remove fields that are now implicit in collection name
          const cleanQuestions = questions.map(q => {
            const { subjectName: _, standard: __, _id, __v, ...cleanQ } = q;
            return {
              ...cleanQ,
              createdAt: q.createdAt || new Date(),
              updatedAt: q.updatedAt || new Date()
            };
          });

          // Insert into new collection
          await NewQuestionModel.insertMany(cleanQuestions, { ordered: false });
          
          batchMigrated += cleanQuestions.length;
          skip += batchSize;

          console.log(`   📦 Migrated batch: ${batchMigrated}/${combo.count} questions`);
        }

        totalMigrated += batchMigrated;
        migrationResults.push({
          subject: subjectName,
          standard: standard,
          count: batchMigrated,
          status: 'success'
        });

        console.log(`   ✅ Successfully migrated ${batchMigrated} questions for ${subjectName} - Standard ${standard}`);

      } catch (error) {
        console.error(`   ❌ Error migrating ${subjectName} - Standard ${standard}:`, error.message);
        migrationResults.push({
          subject: subjectName,
          standard: standard,
          count: 0,
          status: 'failed',
          error: error.message
        });
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Total questions migrated: ${totalMigrated}/${totalQuestions}`);
    console.log(`✅ Successful migrations: ${migrationResults.filter(r => r.status === 'success').length}`);
    console.log(`❌ Failed migrations: ${migrationResults.filter(r => r.status === 'failed').length}`);

    if (totalMigrated === totalQuestions) {
      console.log('\n🎉 Migration completed successfully!');
      console.log(`💡 You can now safely drop the old '${oldCollectionName}' collection if desired`);
      console.log(`   Use: db.${oldCollectionName}.drop()`);
    } else {
      console.log('\n⚠️ Migration completed with some issues. Please check the logs above.');
    }

    return migrationResults;

  } catch (error) {
    console.error('💥 Migration failed:', error);
    throw error;
  }
}

// Function to verify migration
async function verifyMigration(oldCollectionName = 'questions') {
  try {
    console.log('🔍 Verifying migration...');

    const OldQuestionSchema = new mongoose.Schema({}, { strict: false });
    const OldQuestion = mongoose.model('VerifyOldQuestion', OldQuestionSchema, oldCollectionName);

    // Get counts from old collection
    const oldCombinations = await OldQuestion.aggregate([
      {
        $group: {
          _id: {
            subjectName: '$subjectName',
            standard: '$standard'
          },
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('📊 Verification Results:');
    let allMatched = true;

    for (const combo of oldCombinations) {
      const { subjectName, standard } = combo._id;
      const NewQuestionModel = getQuestionModel(subjectName, standard);
      const newCount = await NewQuestionModel.countDocuments();

      const matched = combo.count === newCount;
      if (!matched) allMatched = false;

      console.log(`${matched ? '✅' : '❌'} ${subjectName} - Standard ${standard}: Old(${combo.count}) vs New(${newCount})`);
    }

    if (allMatched) {
      console.log('\n🎉 Migration verification successful! All counts match.');
    } else {
      console.log('\n⚠️ Migration verification found discrepancies. Please check the migration.');
    }

    return allMatched;

  } catch (error) {
    console.error('Error verifying migration:', error);
    return false;
  }
}

module.exports = { 
  migrateToSeparateCollections, 
  verifyMigration 
};
