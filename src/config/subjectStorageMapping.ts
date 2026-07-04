// Map between display names and storage folder names
export const subjectToStorageMap: { [key: string]: string } = {
  'Applied Mathematics - AM (BAS 101)': 'AM',
  'Applied Physics - AP (BAS 102)': 'AP',
  'Programming with C - C (BCS 101)': 'C',
  'IT Workshop - ITW (BAI 102)': 'ITW',
  'Introduction to Data Science - IDS (BAI 103)': 'IDS',
  'Basics of Electrical and Electronics Engineering - BEE (BEC 101)': 'BEE',
  'Web Application Development - WAD (BCS 102)': 'WAD',
  'Communication Skills - CS (HMC 101)': 'CS',
  'Analog Communication Systems (ACS)': 'ACS',
  'Probability and Statistics - PS (BAS 103)': 'PS',
  'Environmental Sciences - EVS (BAS 104)': 'EVS',
  'Data Structures and Algorithms - DSA (BCS 103)': 'DSA',
  'Mobile Application Development - MAD (BCS 104)': 'MAD',
  'Soft Skills and Personality Development - SSPD (HMC 102)': 'SSPD',
  'Programming with Python - PP (BAI 101)': 'PP',
  'Fundamentals of Electrical Sciences - FES (BEC 105)': 'FES',
  'Signals and Systems - SS (BEC 102)': 'SS',
  'Programming Fundamentals - PF (BAI 104)': 'PF',
  'Electronics Workshop - EW (BEC 103)': 'EW',
  'Network Analysis and Synthesis - NAS (BEC 104)': 'NAS',
  'Object Oriented Programming System - OOPS (BIT 102)': 'OOPS',
  'Elements of Mechanical Engineering - EME (BMA 106)': 'EME',
  'Workshop Practice - WP (BMA 107)': 'WP',
  'Engineering Graphics - EG (BMA 102)': 'EG',
  'Engineering Mechanics - EM (BMA 103)': 'EM',
  'Calculus I - CAL1 (BAS 105)': 'calculus_1',
  'Calculus II - CAL2 (BAS 106)': 'calculus_2',
  'Linear Algebra - LA (BAS 107)': 'LA',
  'Programming Tools for Mathematics - PTM (BAS 108)': 'PTM',
  'IKS/UHV': 'IKS&UHV',
  'Design and Analysis of Algorithms (DAA)': 'DAA',
  'Operating Systems (OS)': 'OS',
  'Fundamentals of Devops (FD)': 'Devops'
};

// Reverse mapping for display names
export const storageToSubjectMap: { [key: string]: string } = 
  Object.entries(subjectToStorageMap).reduce((acc, [display, storage]) => {
    acc[storage] = display;
    return acc;
  }, {} as { [key: string]: string });
