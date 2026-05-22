export const homeMenuModalData = {
  shop: {
    title: "Magic Shop",
    subtitle: "Buy skins and cards",
    icon: "storefront",
    sections: [
      {
        id: "skin-shop",
        tabTitle: "Skins",
        title: "Skin Shop",
        icon: "shirt",
        type: "shop",
        items: [
          {
            id: "fire-mage-skin",
            title: "Fire Mage Skin",
            description: "A blazing wizard outfit.",
            price: 300,
            currency: "gold",
            image: require("../assets/images/fireMage.png"),
            available: true,
          },
          {
            id: "water-mage-skin",
            title: "Water Mage Skin",
            description: "A calm magical robe.",
            price: 250,
            currency: "gold",
            image: require("../assets/images/waterMage.png"),
            available: true,
          },
        ],
      },
      {
        id: "card-shop",
        tabTitle: "Cards",
        title: "Card Shop",
        icon: "albums",
        type: "shop",
        items: [
          {
            id: "power-card",
            title: "Power Card",
            description: "Boost your battle power.",
            price: 120,
            currency: "gold",
            image: require("../assets/images/powerCard.png"),
            available: true,
          },
          {
            id: "shield-card",
            title: "Shield Card",
            description: "Protect your wizard.",
            price: 100,
            currency: "gold",
            image: require("../assets/images/shieldCard.png"),
            available: true,
          },
        ],
      },
    ],
  },

  inventory: {
    title: "Magic Bag",
    subtitle: "Your owned skins and cards",
    icon: "bag",
    sections: [
      {
        id: "skin-inventory",
        tabTitle: "Skins",
        title: "Skin Inventory",
        icon: "shirt",
        type: "inventory",
        items: [
          {
            id: "default-wizard",
            title: "Default Wizard",
            description: "Your starting wizard skin.",
            image: require("../assets/images/greenWizard.png"),
            status: "Equipped",
          },

        ],
      },
      {
        id: "card-inventory",
        tabTitle: "Cards",
        title: "Card Inventory",
        icon: "albums",
        type: "inventory",
        items: [
      
        ],
      },
    ],
  },

  history: {
    title: "History",
    subtitle: "Learning and battle records",
    icon: "time",
    sections: [
      {
        id: "completed-lessons",
        tabTitle: "Lessons",
        title: "Completed Lessons",
        icon: "checkmark-circle",
        type: "history",
        items: [
        
        ],
      },
      {
        id: "battle-history",
        tabTitle: "Battles",
        title: "Battle History",
        icon: "shield",
        type: "history",
        items: [
          {
            id: "no-battle",
            title: "No battle records yet",
            description: "Battle mode is still under development.",
            status: "Pending",
          },
        ],
      },
      {
        id: "win-rate",
        tabTitle: "Win Rate",
        title: "Win Rate",
        icon: "trophy",
        type: "history",
        items: [
          {
            id: "wins",
            title: "0 Wins",
            description: "Total battles won.",
            status: "0",
          },
          {
            id: "losses",
            title: "0 Losses",
            description: "Total battles lost.",
            status: "0",
          },
          {
            id: "rate",
            title: "0% Win Rate",
            description: "Current battle performance.",
            status: "0%",
          },
        ],
      },
    ],
  },
};