let messagePartners = [];

const addMessagePartner = ({ sender, receiver }) => {
  const mp = getMessagePartner({ sender, receiver });
  if (mp) {
    if (mp.userID1 === sender) {
      mp.userActive1 = true;
      return;
    }
    mp.userActive2 = true;
  } else {
    messagePartners.push({
      userID1: sender,
      userID2: receiver,
      userActive1: true,
      userActive2: false,
      room: `room_${sender}_${receiver}`
    });
  }
};

const deleteMessagePartner = ({ sender, receiver }) => {};

const getMessagePartners = ({ sender }) => {
  const mps = messagePartners.filter(mp => {
    return (
      (mp.userID1 === sender && mp.userActive1) ||
      (mp.userID2 === sender && mp.userActive2)
    );
  });
  return mps.map(mp => {
    const partnerID = mp.userID1 === sender ? mp.userID2 : mp.userID1;
    return { id: partnerID };
  });
};

const getMessagePartner = ({ sender, receiver }) => {
  return messagePartners.find(
    mp =>
      (mp.userID1 === sender && mp.userID2 === receiver) ||
      (mp.userID1 === receiver && mp.userID2 === sender)
  );
};

module.exports = {
  addMessagePartner,
  deleteMessagePartner,
  getMessagePartners,
  getMessagePartner
};
