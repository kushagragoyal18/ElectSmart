const nationalPortal = 'https://voters.eci.gov.in/';

function offsetDate(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function assembly({
  id,
  name,
  category = 'State',
  assemblySeats,
  lokSabhaSeats,
  date,
  year,
  dateStatus = 'estimated',
  phase = 'Planning window',
}) {
  return {
    id,
    name,
    category,
    assemblySeats,
    lokSabhaSeats,
    nextElection: {
      type: 'Assembly',
      title: `${name} Assembly Election`,
      date,
      year,
      dateStatus,
      phase,
    },
    registration: {
      deadline: offsetDate(date, -30),
      portal: nationalPortal,
    },
    timeline: {
      announcement: offsetDate(date, -60),
      registration: offsetDate(date, -30),
      nomination: offsetDate(date, -25),
      campaign: offsetDate(date, -20),
      polling: date,
      counting: offsetDate(date, 4),
      results: offsetDate(date, 5),
    },
    pollingSearch: `polling booth locator ${name} Election Commission`,
  };
}

function lokSabha({ id, name, category = 'Union Territory', lokSabhaSeats, date = '2029-04-15' }) {
  return {
    id,
    name,
    category,
    assemblySeats: 0,
    lokSabhaSeats,
    nextElection: {
      type: 'Lok Sabha',
      title: `${name} Lok Sabha Election`,
      date,
      year: 2029,
      dateStatus: 'estimated',
      phase: 'National election planning window',
    },
    registration: {
      deadline: offsetDate(date, -30),
      portal: nationalPortal,
    },
    timeline: {
      announcement: offsetDate(date, -60),
      registration: offsetDate(date, -30),
      nomination: offsetDate(date, -25),
      campaign: offsetDate(date, -20),
      polling: date,
      counting: offsetDate(date, 4),
      results: offsetDate(date, 5),
    },
    pollingSearch: `polling booth locator ${name} Election Commission`,
  };
}

export const indiaElectionData = [
  assembly({ id: 'andhra-pradesh', name: 'Andhra Pradesh', assemblySeats: 175, lokSabhaSeats: 25, date: '2029-05-13', year: 2029 }),
  assembly({ id: 'arunachal-pradesh', name: 'Arunachal Pradesh', assemblySeats: 60, lokSabhaSeats: 2, date: '2029-04-19', year: 2029 }),
  assembly({ id: 'assam', name: 'Assam', assemblySeats: 126, lokSabhaSeats: 14, date: '2031-04-09', year: 2031 }),
  assembly({ id: 'bihar', name: 'Bihar', assemblySeats: 243, lokSabhaSeats: 40, date: '2030-10-15', year: 2030 }),
  assembly({ id: 'chhattisgarh', name: 'Chhattisgarh', assemblySeats: 90, lokSabhaSeats: 11, date: '2028-11-10', year: 2028 }),
  assembly({ id: 'goa', name: 'Goa', assemblySeats: 40, lokSabhaSeats: 2, date: '2027-02-14', year: 2027 }),
  assembly({ id: 'gujarat', name: 'Gujarat', assemblySeats: 182, lokSabhaSeats: 26, date: '2027-12-01', year: 2027 }),
  assembly({ id: 'haryana', name: 'Haryana', assemblySeats: 90, lokSabhaSeats: 10, date: '2029-10-05', year: 2029 }),
  assembly({ id: 'himachal-pradesh', name: 'Himachal Pradesh', assemblySeats: 68, lokSabhaSeats: 4, date: '2027-11-12', year: 2027 }),
  assembly({ id: 'jharkhand', name: 'Jharkhand', assemblySeats: 81, lokSabhaSeats: 14, date: '2029-11-20', year: 2029 }),
  assembly({ id: 'karnataka', name: 'Karnataka', assemblySeats: 224, lokSabhaSeats: 28, date: '2028-05-10', year: 2028 }),
  assembly({ id: 'kerala', name: 'Kerala', assemblySeats: 140, lokSabhaSeats: 20, date: '2031-04-23', year: 2031 }),
  assembly({ id: 'madhya-pradesh', name: 'Madhya Pradesh', assemblySeats: 230, lokSabhaSeats: 29, date: '2028-11-17', year: 2028 }),
  assembly({ id: 'maharashtra', name: 'Maharashtra', assemblySeats: 288, lokSabhaSeats: 48, date: '2029-10-20', year: 2029 }),
  assembly({ id: 'manipur', name: 'Manipur', assemblySeats: 60, lokSabhaSeats: 2, date: '2027-02-28', year: 2027 }),
  assembly({ id: 'meghalaya', name: 'Meghalaya', assemblySeats: 60, lokSabhaSeats: 2, date: '2028-02-27', year: 2028 }),
  assembly({ id: 'mizoram', name: 'Mizoram', assemblySeats: 40, lokSabhaSeats: 1, date: '2028-11-07', year: 2028 }),
  assembly({ id: 'nagaland', name: 'Nagaland', assemblySeats: 60, lokSabhaSeats: 1, date: '2028-02-27', year: 2028 }),
  assembly({ id: 'odisha', name: 'Odisha', assemblySeats: 147, lokSabhaSeats: 21, date: '2029-05-13', year: 2029 }),
  assembly({ id: 'punjab', name: 'Punjab', assemblySeats: 117, lokSabhaSeats: 13, date: '2027-02-20', year: 2027 }),
  assembly({ id: 'rajasthan', name: 'Rajasthan', assemblySeats: 200, lokSabhaSeats: 25, date: '2028-11-25', year: 2028 }),
  assembly({ id: 'sikkim', name: 'Sikkim', assemblySeats: 32, lokSabhaSeats: 1, date: '2029-04-19', year: 2029 }),
  assembly({ id: 'tamil-nadu', name: 'Tamil Nadu', assemblySeats: 234, lokSabhaSeats: 39, date: '2031-04-23', year: 2031 }),
  assembly({ id: 'telangana', name: 'Telangana', assemblySeats: 119, lokSabhaSeats: 17, date: '2028-11-30', year: 2028 }),
  assembly({ id: 'tripura', name: 'Tripura', assemblySeats: 60, lokSabhaSeats: 2, date: '2028-02-16', year: 2028 }),
  assembly({ id: 'uttar-pradesh', name: 'Uttar Pradesh', assemblySeats: 403, lokSabhaSeats: 80, date: '2027-02-10', year: 2027 }),
  assembly({ id: 'uttarakhand', name: 'Uttarakhand', assemblySeats: 70, lokSabhaSeats: 5, date: '2027-02-14', year: 2027 }),
  assembly({ id: 'west-bengal', name: 'West Bengal', assemblySeats: 294, lokSabhaSeats: 42, date: '2031-04-29', year: 2031 }),
  assembly({ id: 'delhi', name: 'Delhi', category: 'Union Territory', assemblySeats: 70, lokSabhaSeats: 7, date: '2030-02-05', year: 2030 }),
  assembly({ id: 'jammu-kashmir', name: 'Jammu and Kashmir', category: 'Union Territory', assemblySeats: 90, lokSabhaSeats: 5, date: '2029-09-18', year: 2029 }),
  assembly({ id: 'puducherry', name: 'Puducherry', category: 'Union Territory', assemblySeats: 30, lokSabhaSeats: 1, date: '2031-04-09', year: 2031 }),
  lokSabha({ id: 'andaman-nicobar', name: 'Andaman and Nicobar Islands', lokSabhaSeats: 1 }),
  lokSabha({ id: 'chandigarh', name: 'Chandigarh', lokSabhaSeats: 1 }),
  lokSabha({ id: 'dadra-nagar-haveli-daman-diu', name: 'Dadra and Nagar Haveli and Daman and Diu', lokSabhaSeats: 2 }),
  lokSabha({ id: 'ladakh', name: 'Ladakh', lokSabhaSeats: 1 }),
  lokSabha({ id: 'lakshadweep', name: 'Lakshadweep', lokSabhaSeats: 1 }),
];

export const electionData = Object.fromEntries(indiaElectionData.map((entry) => [entry.id, entry]));
export const states = indiaElectionData.map((entry) => entry.id);

const legacyAliases = {
  Maharashtra: 'maharashtra',
  Karnataka: 'karnataka',
  Delhi: 'delhi',
  Gujarat: 'gujarat',
  TamilNadu: 'tamil-nadu',
};

export function normalizeStateId(stateId) {
  return legacyAliases[stateId] ?? stateId;
}

export function getElectionByState(stateId) {
  return electionData[normalizeStateId(stateId)] ?? null;
}

export function getStateName(stateId) {
  return getElectionByState(stateId)?.name ?? stateId;
}
