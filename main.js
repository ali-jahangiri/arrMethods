const apiEndpoint = "https://randomuser.me/api/";

// DOM selection
const addNewUserBtn = document.querySelector("#addUser");
const calcAllMoneyBtn = document.querySelector("#calcAllMoney");
const doubleMoneyBtn = document.querySelector("#doubleMoney");
const onlyMillBtn = document.querySelector("#onlyMillionaires");
const reachesBtn = document.querySelector("#reaches");

const userListHeader = document.querySelector(".alluser__header");
const totalNumberText = document.querySelector("#total");
const allUserContainer = document.querySelector("#allUserContainer");

// states
let allUsers = [];
const reaches = null;

// Helper function

const calcAverageOfUserNumber = () =>
  (totalNumberText.textContent = `${allUsers.length} user`);

const insertUserItemToList = (userList, overwrite, template) => {
  calcAverageOfUserNumber();
  allUserContainer.innerHTML = "";
  if (template) return (allUserContainer.innerHTML = template);
  const currentListTarget = userList || allUsers;
  currentListTarget.map(({ userName, money }) => {
    const template = `<div class="item">
      <p>${userName}</p>
      <p>$${money}</p>
      </div>`;
    if (!overwrite) return (allUserContainer.innerHTML += template);
    else allUserContainer.innerHTML = template;
  });
};

addNewUserBtn.addEventListener("click", async () => {
  const res = await fetch(apiEndpoint);
  const {
    results: [userData],
  } = await res.json();
  const {
    name: { first, last },
  } = userData;

  const newUserObject = {
    userName: `${first} ${last}`,
    money: Math.floor(Math.random() * 1e7),
  };

  allUsers.push(newUserObject);
  insertUserItemToList();
  document
    .querySelectorAll("button:disabled")
    .forEach((el) => el.removeAttribute("disabled"));
});

reachesBtn.addEventListener("click", () => {
  const [firstOfTheList] = [...allUsers].sort((a, b) => b.money - a.money);
  insertUserItemToList([firstOfTheList], true);
});

calcAllMoneyBtn.addEventListener("click", () => {
  const endSum = allUsers.reduce((acc, res) => (acc += res.money), 0);
  const template = `<div id="calcSum">All user money is <span>$${endSum}</span></div>`;
  insertUserItemToList(undefined, undefined, template);
});

onlyMillBtn.addEventListener("click", () =>
  insertUserItemToList(allUsers.filter((el) => String(el.money).length >= 7))
);

doubleMoneyBtn.addEventListener("click", () => {
  allUsers = allUsers.map((el) => ({ ...el, money: el.money * 2 }));
  insertUserItemToList();
});

userListHeader.addEventListener("click", () => insertUserItemToList());
