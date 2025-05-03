const Subject = require("./models/Subject");
const Question = require("./models/Question");


const seedSubjects = async () => {
    try {
      // Clear existing subjects
      await Subject.deleteMany({});
      
      const subjects = [];
      
      // Create subjects for each standard
      const subjectNames = {
        '1-5': ['English', 'Hindi', 'Maths', 'EVS'],
        '6-8': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit'],
        '9-10': ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Sanskrit', 'Computer']
      };
      
      // 1st to 5th standard
      for (let std = 1; std <= 5; std++) {
        for (const subjectName of subjectNames['1-5']) {
          subjects.push({
            name: subjectName,
            standard: std
          });
        }
      }
      
      // 6th to 8th standard
      for (let std = 6; std <= 8; std++) {
        for (const subjectName of subjectNames['6-8']) {
          subjects.push({
            name: subjectName,
            standard: std
          });
        }
      }
      
      // 9th to 10th standard
      for (let std = 9; std <= 10; std++) {
        for (const subjectName of subjectNames['9-10']) {
          subjects.push({
            name: subjectName,
            standard: std
          });
        }
      }
      
      await Subject.insertMany(subjects);
      console.log('Subjects seeded successfully');
    } catch (error) {
      console.error('Error seeding subjects:', error);
    }
  };
  


  const seedQuestions = async () => {
    try {
      // Clear existing questions
      await Question.deleteMany({});
      
      // Sample questions for Science (10th standard)
      const scienceQuestions = [
        // MCQs (marks: 1)
        {
          text: 'Which of the following is a renewable source of energy?',
          options: ['Coal', 'Natural Gas', 'Solar Energy', 'Petroleum'],
          answer: 'Solar Energy',
          marks: 1,
          type: 'mcq'
        },
        {
          text: 'The SI unit of electric current is:',
          options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
          answer: 'Ampere',
          marks: 1,
          type: 'mcq'
        },
        {
          text: 'Which of the following is not a chemical change?',
          options: ['Rusting of iron', 'Burning of wood', 'Melting of ice', 'Digestion of food'],
          answer: 'Melting of ice',
          marks: 1,
          type: 'mcq'
        },
        {
          text: 'The process of converting sugar into alcohol is called:',
          options: ['Fermentation', 'Respiration', 'Photosynthesis', 'Decomposition'],
          answer: 'Fermentation',
          marks: 1,
          type: 'mcq'
        },
        {
          text: 'Which of the following is not a plant hormone?',
          options: ['Auxin', 'Gibberellin', 'Insulin', 'Cytokinin'],
          answer: 'Insulin',
          marks: 1,
          type: 'mcq'
        },
        {
          text: 'Deficiency of vitamin D causes:',
          options: ['Night blindness', 'Rickets', 'Scurvy', 'Beri-beri'],
          answer: 'Rickets',
          marks: 1,
          type: 'mcq'
        },
        
        // Short questions (marks: 1)
        {
          text: 'Define oxidation reaction.',
          answer: 'Oxidation is a chemical reaction that involves the addition of oxygen or removal of hydrogen or electrons from a substance.',
          marks: 1,
          type: 'short'
        },
        {
          text: 'What is refraction of light?',
          answer: 'Refraction is the bending of light when it passes from one medium to another due to change in speed.',
          marks: 1,
          type: 'short'
        },
        {
          text: 'Define potential difference.',
          answer: 'Potential difference is the work done per unit charge to move a charge between two points in an electric field.',
          marks: 1,
          type: 'short'
        },
        {
          text: 'What is a chemical equation?',
          answer: 'A chemical equation is a symbolic representation of a chemical reaction using chemical formulas to show the reactants and products.',
          marks: 1,
          type: 'short'
        },
        {
          text: 'Name two plant hormones.',
          answer: 'Auxin and Gibberellin are two plant hormones.',
          marks: 1,
          type: 'short'
        },
        
        // Scientific reasons (marks: 2)
        {
          text: 'Why does a compass needle always point in the north-south direction?',
          answer: 'A compass needle always points in the north-south direction because it is a small magnet that aligns itself with Earth\'s magnetic field. The Earth behaves like a large magnet with its magnetic south pole near the geographic north pole and vice versa. Since opposite poles of a magnet attract each other, the north pole of the compass needle points toward the Earth\'s magnetic south pole, which is near the geographic north pole.',
          marks: 2,
          type: 'scientific_reason'
        },
        {
          text: 'Why do we see lightning before we hear thunder?',
          answer: 'We see lightning before we hear thunder because light travels much faster than sound. The speed of light is approximately 300,000 kilometers per second, while the speed of sound in air is only about 343 meters per second. This significant difference in speed means that light from the lightning reaches our eyes almost instantaneously, while the sound waves take longer to reach our ears, creating a delay between seeing the lightning and hearing the thunder.',
          marks: 2,
          type: 'scientific_reason'
        },
        {
          text: 'Why does a swimming pool appear less deep than it actually is?',
          answer: 'A swimming pool appears less deep than it actually is due to the phenomenon of refraction of light. When light passes from water (denser medium) to air (rarer medium), it bends away from the normal. This bending causes the light rays coming from the bottom of the pool to change direction, making the pool appear shallower than its actual depth. This optical illusion is explained by Snell\'s law of refraction.',
          marks: 2,
          type: 'scientific_reason'
        },
        
        // Medium questions (marks: 2)
        {
          text: 'Explain the process of photosynthesis.',
          answer: 'Photosynthesis is the process by which green plants convert light energy into chemical energy. It takes place in the chloroplasts, particularly in the chlorophyll-containing tissues. During photosynthesis, plants use carbon dioxide from the air and water from the soil, along with sunlight, to produce glucose (food) and oxygen. The chemical equation for photosynthesis is: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂. This process is essential for life on Earth as it provides oxygen and serves as the primary source of energy for most living organisms.',
          marks: 2,
          type: 'medium'
        },
        {
          text: 'Describe the structure of an atom.',
          answer: 'An atom consists of three fundamental particles: protons, neutrons, and electrons. At the center of the atom is the nucleus, which contains positively charged protons and neutral neutrons. The nucleus is surrounded by negatively charged electrons that orbit around it in specific energy levels or shells. The number of protons (atomic number) determines the element\'s identity. In a neutral atom, the number of electrons equals the number of protons. The mass of an atom is mainly contributed by protons and neutrons, while electrons have negligible mass but determine the atom\'s chemical properties.',
          marks: 2,
          type: 'medium'
        },
        {
          text: 'Explain Ohm\'s law and its applications.',
          answer: 'Ohm\'s law states that the current flowing through a conductor is directly proportional to the potential difference across it, provided the physical conditions like temperature remain constant. Mathematically, it is expressed as V = IR, where V is the potential difference, I is the current, and R is the resistance. Applications of Ohm\'s law include calculating electrical quantities in circuits, designing electrical devices, determining power consumption (P = VI = I²R), and solving complex circuit problems using methods like Kirchhoff\'s laws.',
          marks: 2,
          type: 'medium'
        },
        {
          text: 'What are the laws of reflection?',
          answer: 'The laws of reflection govern how light reflects off surfaces. There are two main laws: 1) The incident ray, the reflected ray, and the normal at the point of incidence all lie in the same plane. 2) The angle of incidence equals the angle of reflection, measured from the normal. These laws apply to all types of waves, including light, sound, and water waves, and are fundamental in understanding how mirrors work, image formation, periscopes, and other optical devices.',
          marks: 2,
          type: 'medium'
        },
        {
          text: 'Describe the water cycle.',
          answer: 'The water cycle, also known as the hydrological cycle, is the continuous movement of water on, above, and below the Earth\'s surface. It involves several processes: evaporation (water turning into vapor from oceans, lakes, and rivers due to solar energy), transpiration (release of water vapor from plants), condensation (water vapor cooling to form clouds), precipitation (water falling back to Earth as rain, snow, etc.), and collection (water gathering in oceans, lakes, rivers, and groundwater). This cycle is essential for maintaining the Earth\'s water balance, regulating climate, and supporting all forms of life.',
          marks: 2,
          type: 'medium'
        },
        
        // Long questions (marks: 3)
        {
          text: 'Explain the structure and function of the human heart.',
          answer: 'The human heart is a muscular organ about the size of a closed fist, located slightly to the left of the middle of the chest. Structure: The heart has four chambers - two upper atria (right and left) and two lower ventricles (right and left). It is divided into right and left halves by the septum. The right side of the heart receives deoxygenated blood from the body and pumps it to the lungs, while the left side receives oxygenated blood from the lungs and pumps it to the rest of the body. The heart has four valves (tricuspid, pulmonary, mitral, and aortic) that ensure one-way flow of blood.\n\nFunction: The primary function of the heart is to pump blood throughout the body. This process consists of two main phases: diastole (relaxation) and systole (contraction). During diastole, the atria contract, pushing blood into the ventricles. During systole, the ventricles contract, pumping blood into the arteries. The right ventricle pumps blood to the lungs through the pulmonary artery for oxygenation (pulmonary circulation), while the left ventricle pumps oxygenated blood to the body through the aorta (systemic circulation). This continuous pumping ensures the delivery of oxygen and nutrients to tissues and the removal of waste products.',
          marks: 3,
          type: 'long'
        },
        {
          text: 'Describe the process of extraction of metals from their ores.',
          answer: 'Metal extraction from ores involves several steps depending on the reactivity of the metal. First, the ore is crushed and ground to increase surface area for better reaction. Next is concentration or enrichment, where unwanted rocky material (gangue) is removed. Methods include gravity separation, froth flotation, or magnetic separation.\n\nThe concentrated ore then undergoes extraction. For highly reactive metals (K, Na, Ca), electrolysis is used. For moderately reactive metals (Fe, Zn, Pb), the ore is roasted to convert it to its oxide, then reduced using carbon or carbon monoxide in a blast furnace. For less reactive metals (Cu, Hg), the ore is heated in air (smelting) to form the oxide, which is then reduced.\n\nAfter extraction, the metal undergoes refining to remove impurities. Methods include electrolytic refining, zone refining, or distillation. The choice of extraction method depends on the metal\'s position in the reactivity series, economic factors, and environmental considerations.',
          marks: 3,
          type: 'long'
        },
        {
          text: 'Explain the laws of motion given by Newton.',
          answer: 'Newton\'s three laws of motion are fundamental principles that describe the relationship between an object and the forces acting upon it. Newton\'s First Law (Law of Inertia) states that an object at rest remains at rest, and an object in motion remains in motion with the same speed and direction, unless acted upon by an unbalanced force. This law explains why we need seatbelts in vehicles and why objects continue moving when thrown.\n\nNewton\'s Second Law (Law of Acceleration) states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically, F = ma, where F is the net force, m is the mass, and a is the acceleration. This law explains why heavier objects require more force to accelerate at the same rate as lighter objects.\n\nNewton\'s Third Law (Law of Action and Reaction) states that for every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first. This law explains rocket propulsion, walking, and swimming. These laws form the foundation of classical mechanics and have wide applications in engineering, sports, and everyday phenomena.',
          marks: 3,
          type: 'long'
        },
        {
          text: 'Describe the structure and functions of the human respiratory system.',
          answer: 'The human respiratory system consists of organs and tissues that enable breathing. The main structures include the nose, pharynx (throat), larynx (voice box), trachea (windpipe), bronchi, bronchioles, and lungs. Air enters through the nostrils, where it is filtered, moistened, and warmed. It passes through the pharynx and larynx to the trachea, which splits into two bronchi leading to each lung. The bronchi divide into smaller bronchioles, ending in tiny air sacs called alveoli.\n\nThe respiratory system serves several functions. Its primary function is gas exchange: oxygen from inhaled air diffuses into the bloodstream through the alveoli walls, while carbon dioxide from the blood diffuses into the alveoli to be exhaled. The respiratory system also helps regulate blood pH, filters air, produces sounds for speech, and provides a route for water loss and heat exchange.\n\nThe breathing process consists of inhalation and exhalation. During inhalation, the diaphragm contracts and moves downward, the chest cavity expands, pressure inside decreases, and air rushes in. During exhalation, the diaphragm relaxes, the chest cavity becomes smaller, pressure increases, and air is forced out. This process is regulated by the respiratory center in the brain stem, which responds to changes in blood CO₂ levels and pH.',
          marks: 3,
          type: 'long'
        },
        {
          text: 'Explain the process of digestion in humans.',
          answer: 'Human digestion is a complex process that breaks down food into nutrients that can be absorbed into the bloodstream. It begins in the mouth, where mechanical digestion occurs through chewing and chemical digestion starts with salivary amylase breaking down carbohydrates. Food is then swallowed and passes through the esophagus to the stomach via peristalsis.\n\nIn the stomach, gastric juice containing hydrochloric acid and enzymes like pepsin partially digests proteins. The stomach churns the food into a semi-liquid chyme. The chyme then enters the small intestine, where most digestion and absorption occurs. Bile from the liver emulsifies fats, while pancreatic enzymes (amylase, protease, lipase) and intestinal enzymes break down carbohydrates, proteins, and fats into smaller molecules.\n\nThese nutrients are absorbed through the intestinal walls into the bloodstream. The small intestine\'s inner lining is folded into villi and microvilli, increasing surface area for absorption. Water-soluble nutrients enter the bloodstream directly, while fats enter the lymphatic system first. Undigested material passes to the large intestine, where water and electrolytes are absorbed. Finally, waste is eliminated through the rectum and anus as feces. The entire process is regulated by various hormones and the nervous system to ensure efficient digestion and absorption.',
          marks: 3,
          type: 'long'
        },
        {
          text: 'Explain the structure of DNA and its role in heredity.',
          answer: 'DNA (Deoxyribonucleic Acid) is a double-stranded helical molecule that carries genetic instructions for the development, functioning, growth, and reproduction of all known organisms. Its structure, discovered by Watson and Crick in 1953, consists of two strands coiled around each other in a double helix. Each strand is made up of nucleotides, which contain a phosphate group, a deoxyribose sugar, and one of four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), or Cytosine (C). The two strands are held together by hydrogen bonds between complementary base pairs: A pairs with T, and G pairs with C.\n\nDNA plays a crucial role in heredity through several mechanisms. It stores genetic information in the sequence of its bases, which act as a code for producing proteins. During cell division, DNA replicates itself exactly, ensuring that genetic information is passed from parent cells to daughter cells. In sexual reproduction, half of an offspring\'s DNA comes from each parent through gametes (eggs and sperm), explaining why children share traits with both parents.\n\nDNA also controls inheritance through genes, which are specific segments of DNA that code for particular proteins or traits. Variations in genes (alleles) can lead to different traits. Mutations in DNA can create new alleles, driving evolution and genetic diversity. The Human Genome Project has mapped all human DNA, enhancing our understanding of heredity, genetic disorders, and potential treatments. DNA\'s role in heredity is fundamental to the fields of genetics, evolution, and modern medicine',
        marks: 3,
          type: 'long'
        },
        {
          text: 'Explain the structure of DNA and its role in heredity.',
          answer: 'DNA (Deoxyribonucleic Acid) is a double-stranded helical molecule that carries genetic instructions for the development, functioning, growth, and reproduction of all known organisms. Its structure, discovered by Watson and Crick in 1953, consists of two strands coiled around each other in a double helix. Each strand is made up of nucleotides, which contain a phosphate group, a deoxyribose sugar, and one of four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), or Cytosine (C). The two strands are held together by hydrogen bonds between complementary base pairs: A pairs with T, and G pairs with C.\n\nDNA plays a crucial role in heredity through several mechanisms. It stores genetic information in the sequence of its bases, which act as a code for producing proteins. During cell division, DNA replicates itself exactly, ensuring that genetic information is passed from parent cells to daughter cells. In sexual reproduction, half of an offspring\'s DNA comes from each parent through gametes (eggs and sperm), explaining why children share traits with both parents.\n\nDNA also controls inheritance through genes, which are specific segments of DNA that code for particular proteins or traits. Variations in genes (alleles) can lead to different traits. Mutations in DNA can create new alleles, driving evolution and genetic diversity. The Human Genome Project has mapped all human DNA, enhancing our understanding of heredity, genetic disorders, and potential treatments. DNA\'s role in heredity is fundamental to the fields of genetics, evolution, and modern medicine.',
          marks: 3,
          type: 'long'
        },
        {
          text: 'Describe the modern periodic table and periodic trends.',
          answer: 'The modern periodic table arranges elements by increasing atomic number (number of protons) and groups elements with similar properties in vertical columns. It consists of 18 groups (columns) and 7 periods (rows), plus an additional row for lanthanides and actinides. Elements are classified as metals (left and middle), non-metals (upper right), and metalloids (along the stair-step line separating metals and non-metals).\n\nSeveral periodic trends are observed across the table. Atomic radius generally decreases from left to right across a period due to increasing nuclear charge pulling electrons closer, and increases from top to bottom within a group as new electron shells are added. Ionization energy (energy required to remove an electron) increases from left to right and decreases from top to bottom, as electrons are held more tightly by elements with higher nuclear charge and fewer electron shells.\n\nElectronegativity (tendency to attract electrons) increases from left to right and decreases from top to bottom. Metallic character decreases across periods and increases down groups. Electron affinity (energy released when an electron is added) generally increases from left to right. These trends help predict chemical behavior, reactivity, and properties of elements, making the periodic table an essential tool in chemistry for understanding element relationships and predicting chemical behavior.',
          marks: 3,
          type: 'long'
        },
        {
          text: 'Explain the concept of sustainable development and its importance.',
          answer: 'Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs. It rests on three pillars: economic growth, social inclusion, and environmental protection. The concept recognizes that human civilization requires economic advancement, but it must occur alongside social well-being and environmental conservation.\n\nSustainable development is important for several reasons. First, it addresses resource scarcity by promoting efficient and responsible use of natural resources, ensuring their availability for future generations. Second, it helps combat climate change by encouraging renewable energy sources and reducing greenhouse gas emissions. Third, it promotes biodiversity conservation by protecting ecosystems and preventing species extinction, which is vital for maintaining ecological balance.\n\nFourth, sustainable development fosters social equity by ensuring that development benefits are shared fairly among all sections of society, reducing poverty and inequality. Fifth, it enhances economic stability by creating resilient economies that can withstand shocks while providing sustainable livelihoods. Sixth, it improves quality of life through cleaner air and water, healthier food, and better living conditions.\n\nGlobally, the United Nations\' 17 Sustainable Development Goals (SDGs) provide a blueprint for achieving sustainable development by 2030. These goals address various aspects including poverty, hunger, health, education, gender equality, clean water, affordable energy, economic growth, infrastructure, inequality, sustainable cities, responsible consumption, climate action, life below water, life on land, peace, and partnerships. Achieving sustainable development requires concerted efforts from governments, businesses, civil society, and individuals worldwide.',
          marks: 3,
          type: 'long'
        },
        
        // Optional questions (marks: 5)
        {
          text: 'Explain the structure and function of the human nervous system.',
          answer: 'The human nervous system is a complex network that coordinates actions and sensory information by transmitting signals between different parts of the body. It is divided into two main parts: the Central Nervous System (CNS) and the Peripheral Nervous System (PNS).\n\nThe Central Nervous System consists of the brain and spinal cord. The brain, protected by the skull, is the control center of the nervous system and has different regions with specific functions. The cerebrum controls voluntary actions, thought, memory, and sensory processing. The cerebellum coordinates muscle movements and maintains balance. The brain stem connects the brain to the spinal cord and controls automatic functions like breathing and heart rate. The spinal cord, protected by the vertebral column, serves as a communication pathway between the brain and the rest of the body and controls reflex actions.\n\nThe Peripheral Nervous System includes all nerves outside the CNS and is further divided into the Somatic Nervous System (controls voluntary movements and relays sensory information) and the Autonomic Nervous System (controls involuntary functions). The Autonomic Nervous System is split into the Sympathetic Nervous System (controls "fight or flight" responses) and the Parasympathetic Nervous System (controls "rest and digest" functions).\n\nAt the cellular level, the nervous system is composed of neurons (nerve cells) and glial cells (supporting cells). Neurons have a cell body, dendrites (receive signals), and an axon (transmits signals). Neurons communicate through electrochemical signals called action potentials. When a neuron is stimulated, an electrical impulse travels along its axon. At the synapse (junction between neurons), neurotransmitters are released, which bind to receptors on the next neuron, passing the signal.\n\nThe functions of the nervous system include sensory input (gathering information), integration (processing information), and motor output (responding to information). It controls both voluntary actions (like walking) and involuntary actions (like heartbeat), regulates homeostasis, enables learning and memory, and allows for consciousness and cognition. Disorders of the nervous system include Alzheimer\'s disease, Parkinson\'s disease, epilepsy, and multiple sclerosis, which can affect movement, memory, sensation, or cognition.',
          marks: 5,
          type: 'optional'
        },
        {
          text: 'Describe the causes and effects of air pollution and suggest measures to control it.',
          answer: 'Air pollution is the presence of harmful substances in the atmosphere that can cause adverse effects on living organisms and the environment. The major causes of air pollution include industrial emissions from factories, power plants, and refineries, which release pollutants like sulfur dioxide, nitrogen oxides, and particulate matter. Vehicle emissions contribute carbon monoxide, nitrogen oxides, and volatile organic compounds. Agricultural activities release ammonia and methane from livestock and fertilizer use. Deforestation reduces the earth\'s capacity to absorb carbon dioxide. Household activities like cooking with solid fuels and using certain consumer products also contribute significantly, especially in developing countries. Waste disposal, particularly through incineration, releases dioxins and furans. Natural sources such as volcanic eruptions, wildfires, and dust storms also contribute to air pollution.\n\nThe effects of air pollution are far-reaching. Health impacts include respiratory diseases like asthma and bronchitis, cardiovascular diseases, lung cancer, and reduced life expectancy. Children, elderly, and those with pre-existing conditions are particularly vulnerable. Environmental effects include acid rain, which damages buildings, plants, and aquatic ecosystems; smog formation, which reduces visibility and harms plants; ozone depletion, which increases UV radiation reaching the Earth; and climate change, as greenhouse gases trap heat and alter weather patterns. Air pollution also affects the economy through healthcare costs, reduced agricultural productivity, and damage to infrastructure.\n\nTo control air pollution, several measures can be implemented. Technological solutions include installing air pollution control devices like scrubbers and electrostatic precipitators in industries, developing and using cleaner energy sources like solar and wind power, and improving energy efficiency in buildings and appliances. Policy interventions such as strict emission standards for vehicles and industries, promoting public transportation and electric vehicles, and implementing cap-and-trade systems or carbon taxes can be effective. Individual actions like reducing energy consumption, using environmentally-friendly products, carpooling, and proper waste disposal make a difference. Urban planning strategies such as creating green spaces, designing walkable cities, and implementing traffic management systems help reduce pollution. International cooperation is essential, as air pollution crosses borders, requiring global agreements and technology transfer to developing countries. Public awareness and education about the causes and effects of air pollution and ways to reduce it are also crucial for fostering behavioral changes and support for pollution control policies.',
          marks: 5,
          type: 'optional'
        },
        {
          text: 'Explain the law of conservation of energy with examples from daily life.',
          answer: 'The law of conservation of energy states that energy can neither be created nor destroyed; it can only be transformed from one form to another or transferred from one object to another. The total energy in an isolated system remains constant over time. This fundamental principle is one of the cornerstones of physics and applies to all phenomena in the universe.\n\nIn mathematical terms, if a system has initial energy E₁ and final energy E₂, then E₁ = E₂, assuming no energy enters or leaves the system. In a non-isolated system, the law can be expressed as E₁ + W = E₂, where W represents the work done on or by the system (energy transferred into or out of the system).\n\nThis law is demonstrated in numerous everyday examples. In a pendulum, energy continuously transforms between potential energy (at the highest points) and kinetic energy (at the lowest point). While friction gradually converts some energy to heat, the total energy remains constant. Similarly, when a ball is dropped, its potential energy converts to kinetic energy as it falls. Upon impact, this kinetic energy transforms into sound, heat, and energy of deformation, but the sum remains equal to the initial potential energy.\n\nRoller coasters vividly demonstrate energy conservation. The initial gravitational potential energy at the highest point converts to kinetic energy during descent. This energy continues to transform between potential and kinetic forms throughout the ride. Some energy dissipates as heat due to friction, which is why the subsequent hills are progressively lower.\n\nIn electrical appliances, electrical energy transforms into various forms: light in bulbs, sound in speakers, mechanical energy in fans, heat in toasters, and so on. Even when energy seems "used up," it has merely changed form, often to heat that dissipates into the environment.\n\nDuring photosynthesis, plants convert light energy from the sun into chemical energy stored in glucose. When animals consume plants, they break down glucose to release energy for bodily functions, completing an energy cycle. In automobile engines, chemical energy in fuel converts to thermal energy during combustion, then to mechanical energy to move the vehicle, with some lost as heat and sound.\n\nHydroelectric power generation illustrates multiple energy transformations: gravitational potential energy of water converts to kinetic energy as it falls, then to mechanical energy in turbines, and finally to electrical energy in generators. Throughout all these examples, while energy transforms from one form to another, the total amount remains constant, beautifully demonstrating the law of conservation of energy that governs our universe.',
          marks: 5,
          type: 'optional'
        },
        {
          text: 'Discuss the importance of biodiversity and the threats it faces.',
          answer: 'Biodiversity refers to the variety of life on Earth, encompassing the diversity of species, genes, and ecosystems. It is important for numerous reasons. Ecologically, biodiversity maintains ecosystem functions and services such as clean air and water, pollination, pest control, and nutrient cycling. Greater diversity generally leads to more stable ecosystems that can better withstand and recover from disturbances like natural disasters and climate change. Each species, even seemingly insignificant ones, plays a role in their ecosystem, and their loss can trigger cascading effects throughout the food web.\n\nBiodiversity provides immense economic benefits through resources like food, medicine, timber, and fibers. Approximately 40% of prescription medicines are derived from natural sources. Wild crop relatives contribute genetic diversity essential for developing disease-resistant and climate-adapted crop varieties. Nature-based industries like ecotourism generate significant revenue for many countries. Beyond these utilitarian values, biodiversity has cultural and aesthetic importance. Many cultures have traditions, religions, and identities closely tied to local biodiversity. Natural landscapes provide recreational, spiritual, and psychological benefits, contributing to human well-being.\n\nDespite its importance, biodiversity faces numerous threats. Habitat loss and fragmentation due to agriculture, urbanization, infrastructure development, and extractive activities is the primary threat. Overexploitation through overfishing, poaching, and unsustainable harvesting depletes populations faster than they can recover. Pollution from agricultural runoff, industrial discharge, plastic waste, and other sources damages habitats and directly harms organisms. Invasive species introduced to new areas can outcompete native species, disrupt ecosystems, and spread diseases. Climate change alters habitats, disrupts seasonal patterns affecting migration and reproduction, and increases extreme weather events.\n\nCombating these threats requires a multi-faceted approach. Protected areas like national parks and marine reserves safeguard habitats, though they must be effectively managed and connected by wildlife corridors. Sustainable resource management practices in forestry, fisheries, and agriculture can reduce biodiversity impacts while meeting human needs. Restoration efforts can repair damaged ecosystems and reestablish native species. Legislative measures such as endangered species protection laws, pollution controls, and international agreements like the Convention on Biological Diversity provide legal frameworks for conservation.\n\nEducation and awareness raise public support for conservation initiatives and encourage sustainable consumer choices. Indigenous and local communities often have traditional knowledge valuable for conservation and should be involved in decision-making. Research and monitoring help identify threats, assess conservation effectiveness, and develop new approaches. Financial mechanisms like payment for ecosystem services and reducing perverse subsidies can align economic incentives with conservation goals. Given the global nature of biodiversity and its threats, international cooperation is essential for sharing resources, knowledge, and coordinating conservation efforts across borders.',
          marks: 5,
          type: 'optional'
        }
      ];
      
      await Question.insertMany(scienceQuestions);
      console.log('Questions seeded successfully');
    } catch (error) {
      console.error('Error seeding questions:', error);
    }
  };
  

   const seedDatabase = async () => {
    // await seedSubjects();
    await seedQuestions();
    
    // Close the connection after seeding
    // mongoose.connection.close();
    // console.log('Database seeded successfully');
  };
  
  module.exports = seedDatabase;