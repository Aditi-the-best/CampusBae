export interface SubjectMapping {
  [branch: string]: {
    [semester: string]: string[];
  };
}

export const subjectMapping: SubjectMapping = {
  'CSE': {
    '1': [
      'Applied Mathematics - AM (BAS 101)',
      'Applied Physics - AP (BAS 102)',
      'Programming with C - C (BCS 101)',
      'IT Workshop - ITW (BAI 102)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Web Application Development - WAD (BCS 102)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Probability and Statistics - PS (BAS 103)',
      'Environmental Sciences - EVS (BAS 104)',
      'Data Structures and Algorithm (DSA)',
      'IT Workshop - ITW (BAI 102)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Mobile Application Development - MAD (BCS 104)',
      'Soft Skills and Personality Development - SSPD (HMC 102)'
    ],
    '3': [
      'Discrete Mathematics (DM)',
      'Software Engineering (SE)',
      'Design and Analysis of Algorithms (DAA)',
      'Operations Management (OM)',
      'Ergonomic Design (ED)',
      'IKS/UHV',
      'Introduction to Internet of Things (IOT)'
    ],
    '4': [
      'Database Management Systems (DBMS)',
      'Computer Organization and Architecture (COA)',
      'Operating Systems (OS)',
      'Data Communication and Computer Networks (DCCN)',
      'Information Theory and Coding (ITC)',
      'Statistical Modeling (SM)',
      'Data Mining and Data Warehouse (DMDW)',
      'IKS/UHV',
      'Advanced IoT and Real World Applications - AIoT'
    ]
  },
  'CSE-AI': {
    '1': [
      'Probability and Statistics - PS (BAS 103)',
      'Environmental Sciences - EVS (BAS 104)',
      'Programming with Python - PP (BAI 101)',
      'Web Application Development - WAD (BCS 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'IT Workshop - ITW (BAI 102)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Applied Mathematics - AM (BAS 101)',
      'Applied Physics - AP (BAS 102)',
      'Data Structures and Algorithm (DSA)',
      'Web Application Development - WAD (BCS 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Soft Skills and Personality Development - SSPD (HMC 102)'
    ],
    '3': [
      'Discrete Mathematics (DM)',
      'Database Management Systems (DBMS)',
      'Artificial Intelligence (AI)',
      'Computer Organization and Architecture (COA)',
      'Operations Management (OM)',
      'Ergonomic Design (ED)',
      'IKS/UHV',
      'Object Oriented Programming System - OOPS (BIT 102)'
    ],
    '4': [
      'Design and Analysis of Algorithms (DAA)',
      'Computer Networks (CN)',
      'Operating Systems (OS)',
      'Software Engineering (SE)',
      'Cloud Computing (CC)',
      'Optimization Techniques and Decision Making (OTD)',
      'Statistical Modeling (SM)',
      'IKS/UHV',
      'Open Source Technologies (OST)'
    ]
  },
  'ECE': {
    '1': [
      'Applied Mathematics - AM (BAS 101)',
      'Fundamentals of Electrical Sciences - FES (BEC 105)',
      'Signals and Systems - SS (BEC 102)',
      'Programming Fundamentals - PF (BAI 104)',
      'Web Application Development - WAD (BCS 102)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Electronics Workshop - EW (BEC 103)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Environmental Sciences (BAS 104)',
      'Applied Physics (BAS 102)',
      'Network Analysis and Synthesis (BEC 104)',
      'Programming Fundamentals (BAI 104)',
      'Web Application Development (BCS 102)',
      'Introduction to Data Science (BAI 103)',
      'IT Workshop (BAI 102)',
      'Soft Skills and Personality Development (HMC 102)'
    ],
    '3': [
      'Numerical Techniques for Engineers (NTE)',
      'Digital System Design (DSD)',
      'Analog Communication Systems (ACS)',
      'Data Structures and Algorithm (DSA)',
      'Object Oriented Programming System - OOPS (BIT 102)',
      'Database Management Systems (DBMS)',
      'Subject from NPTEL - NPTEL',
      'IKS/UHV',
      'Electronics Circuit Simulation Workshop (ECSW)',
      'Advanced Electronic Workshop (AEW)',
      'Internship'
    ],
    '4': [
      'Analog Electronics (AE)',
      'Electromagnetic Field Theory & Antenna (EFTA)',
      'Digital Communication Systems (DCS)',
      'Control Systems (CS)',
      'Microprocessors & Microcontrollers (MM)',
      'Electrical Measurement & Instrumentation (EMI)',
      'Electrical Machines (EM)',
      'Sensors and Actuators (SA)',
      'Subject from NPTEL - NPTEL',
      'IKS/UHV'
    ]
  },
  'ECE-AI': {
    '1': [
      'Applied Mathematics - AM (BAS 101)',
      'Fundamentals of Electrical Sciences - FES (BEC 105)',
      'Signals and Systems - SS (BEC 102)',
      'Programming Fundamentals - PF (BAI 104)',
      'Web Application Development - WAD (BCS 102)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Electronics Workshop - EW (BEC 103)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Environmental Sciences - EVS (BAS 104)',
      'Applied Physics - AP (BAS 102)',
      'Network Analysis and Synthesis - NAS (BEC 104)',
      'Programming Fundamentals - PF (BAI 104)',
      'Web Application Development - WAD (BCS 102)',
      'Introduction to Data Science - IDS (BAI 103)',
      'IT Workshop - ITW (BAI 102)',
      'Soft Skills and Personality Development - SSPD (HMC 102)'
    ],
    '3': [
      'Numerical Techniques for Engineers (NTE)',
      'Analog & Digital Electronics (ADE)',
      'Data Structures and Algorithm (DSA)',
      'Object Oriented Programming System - OOPS (BIT 102)',
      // 'Semiconductor Technology (ST)',
      // 'Subject from NPTEL - NPTEL',
      'IKS/UHV',
      'Electronics Circuit Simulation Workshop (ECSW)',
      'Advanced Electronic Workshop (AEW)',
      // 'Internship'
    ],
    '4': [
      'Analog Communication Systems (ACS)',
      'Computer Organization and Architecture (COA)',
      'Artificial Intelligence (AI)',
      'Design and Analysis of Algorithms (DAA)',
      // 'Electromagnetic Field Theory & Antenna (EFTA)',
      'Database Management Systems (DBMS)',
      // 'Information Theory and Coding (ITC)',
      // 'Sensors and Actuators (SA)',
      // 'Subject from NPTEL - NPTEL',
      'IKS/UHV',
      // 'Fundamentals of Devops (FD)'
    ]
  },
  'IT': {
    '1': [
      'Applied Mathematics - AM (BAS 101)',
      'Applied Physics - AP (BAS 102)',
      'Programming with Python - PP (BAI 101)',
      'IT Workshop - ITW (BAI 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Web Application Development - WAD (BCS 102)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Probability and Statistics - PS (BAS 103)',
      'Environmental Sciences - EVS (BAS 104)',
      'Object Oriented Programming System - OOPS (BIT 102)',
      'IT Workshop - ITW (BAI 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Soft Skills and Personality Development - SSPD (HMC 102)'
    ],
    '3': [
      'Discrete Mathematics (DM)',
      'Data Structures and Algorithm (DSA)',
      'Database Management Systems (DBMS)',
      // 'Fundamental of Analog & Digital Electronics - FADE',
      // 'Semiconductor Technology - ST',
      'Computer Organization and Architecture (COA)',
      'Operations Management (OM)',
      'Ergonomic Design (ED)',
      // 'Measurement and Metrology - MM',
      // 'Solar Energy Technology - SET',
      // 'Industrial Waste Water Treatment - IWWT',
      'IKS/UHV',
      'Open Source Technologies (OST)'
      // 'Internship'
    ],
    '4': [
      'Design and Analysis of Algorithms (DAA)',
      'Operating Systems (OS)',
      'Software Engineering (SE)',
      'Statistical Modeling (SM)',
      'Cloud Computing (CC)',
      'Data Mining and Data Warehouse (DMDW)',
      'IKS/UHV',
      'Fundamentals of Devops (FD)'
    ]
  },
  'AI&ML': {
    '1': [
      'Probability and Statistics - PS (BAS 103)',
      'Environmental Sciences - EVS (BAS 104)',
      'Programming with Python - PP (BAI 101)',
      'IT Workshop - ITW (BAI 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Web Application Development - WAD (BCS 102)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Applied Mathematics - AM (BAS 101)',
      'Applied Physics - AP (BAS 102)',
      'Object Oriented Programming System - OOPS (BIT 102)',
      'IT Workshop - ITW (BAI 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Soft Skills and Personality Development - SSPD (HMC 102)'
    ],
    '3': [
      'Discrete Mathematics (DM)',
      'Data Structures and Algorithm (DSA)',
      'Database Management Systems (DBMS)',
      // 'Fundamental of Analog & Digital Electronics - FADE',
      // 'Semiconductor Technology - ST',
      'Computer Organization and Architecture (COA)',
      'Operations Management (OM)',
      'Ergonomic Design (ED)',
      // 'Measurement and Metrology - MM',
      // 'Solar Energy Technology - SET',
      // 'Industrial Waste Water Treatment - IWWT',
      'IKS/UHV',
      'Open Source Technologies (OST)',
      // 'Internship'
    ],
    '4': [
      'Design and Analysis of Algorithms (DAA)',
      'Operating Systems (OS)',
      'Artificial Intelligence (AI)',
      'Cloud Computing (CC)',
      'Statistical Modeling (SM)',
      'Data Mining and Data Warehouse (DMDW)',
      'IKS/UHV',
      'Fundamentals of Devops (FD)'
    ]
  },
  'MAE/DMAM': {
    '1': [
      'Applied Mathematics - AM (BAS 101)',
      'Applied Physics - AP (BAS 102)',
      'Elements of Mechanical Engineering - EME (BMA 106)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Programming Fundamentals - PF (BAI 104)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Web Application Development - WAD (BCS 102)',
      'Workshop Practice - WP (BMA 107)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Probability and Statistics - PS (BAS 103)',
      'Environmental Sciences - EVS (BAS 104)',
      'Engineering Mechanics - EM (BMA 103)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Programming Fundamentals - PF (BAI 104)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Web Application Development - WAD (BCS 102)',
      'Soft Skills and Personality Development - SSPD (HMC 102)'
    ],
    '3': [
      'Numerical Techniques for Engineers (NTE)',
      'Production Technology - I (PT1)',
      'Engineering Materials (EM)',
      'Thermal Engineering - I (TE1)',
      'Machine Drawing Lab (MDL)',
      'Fundamental of Analog & Digital Electronics (FADE)',
      'Semiconductor Technology (ST)',
      'Data Structures (DS)',
      'Object Oriented Programming System - OOPS (BIT 102)',
      'Database Management Systems (DBMS)',
      'Computer Organization and Architecture (COA)',
      'IKS/UHV',
      'Robotics Lab (RL)'
      // 'Internship'
    ],
    '4': [
      'Thermal Engineering - II (TE2)',
      'Production Technology - II (PT2)',
      'Theory of Machines (TOM)',
      'Fluid Mechanics and Hydraulic Machines (FMHM)',
      'Strength of Materials (SOM)',
      'Logistics & Supply Chain Management (LSCM)',
      'Refrigeration and Air-Conditioning (RAC)',
      'Introduction to Autonomous Mobile Robots (IAMR)',
      'Fire Fighting and Life Saving Appliances (FFLSA)',
      'IKS/UHV',
      'IoT Lab (IoTL)'
    ]
  },
  'MAC': {
    '1': [
      'Calculus I - CAL1 (BAS 105)',
      'Environmental Sciences - EVS (BAS 104)',
      'Programming with C - C (BCS 101)',
      'IT Workshop - ITW (BAI 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Web Application Development - WAD (BCS 102)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Communication Skills - CS (HMC 101)'
    ],
    '2': [
      'Calculus II - CAL2 (BAS 106)',
      'Applied Physics - AP (BAS 102)',
      'Linear Algebra - LA (BAS 107)',
      'IT Workshop - ITW (BAI 102)',
      'Basics of Electrical and Electronics Engineering - BEE (BEC 101)',
      'Web Application Development - WAD (BCS 102)',
      'Introduction to Data Science - IDS (BAI 103)',
      'Programming Tools for Mathematics - PTM (BAS 108)',
      'Soft Skills and Personality Development - SSPD (HMC 102)'
    ]
  }
};

export const branches = ['CSE', 'CSE-AI', 'ECE', 'ECE-AI', 'IT', 'AI&ML', 'MAE/DMAM', 'MAC'];
export const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const types = ['notes', 'pyqs', 'syllab', 'book'];

// Get subjects for a specific branch and semester
export const getSubjectsForBranchSemester = (branch: string, semester: string): string[] => {
  return subjectMapping[branch]?.[semester] || [];
};

// Get all unique subjects across all branches and semesters
export const getAllSubjects = (): string[] => {
  const allSubjects = new Set<string>();
  Object.values(subjectMapping).forEach(semesters => {
    Object.values(semesters).forEach(subjects => {
      subjects.forEach(subject => allSubjects.add(subject));
    });
  });
  return Array.from(allSubjects).sort();
};
