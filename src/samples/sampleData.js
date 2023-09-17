const sampleData = {
  initialScreen: "simple",
  apiVersion: 1,
  screens: [
    {
      type: "RootView",
      tag: "simple",
      appBar: {
        type: "TopBar",
        title: "Hello top bar!"
      },
      bottomBar: {
        type: "BottomControl",
        content: [
          {
            type: "Button",
            style: "primary",
            content: "Go to second!",
            tapActions: [
              "push(esim-landing)"
            ]
          }
        ]
      }
    },
    {
      type: "RootView",
      tag: "esim-landing",
      appearActions: [
        "analytics(esim_entered_screen, key1=value1, key2=value2)"
      ],
      disappearActions: [
        "analytics(esim_leaved_screen)"
      ],
      appBar: {
        type: "TopBar",
        style: "default",
        title: "Волна"
      },
      bottomBar: {
        type: "BottomControl",
        direction: "vertical",
        content: [
          {
            type: "Button",
            style: "primary",
            content: "Оформить eSIM",
            tapActions: [
              "navigate(purchase)"
            ]
          },
          {
            type: "Button",
            style: "text",
            content: "Мои eSIM",
            tapActions: [
              "navigate(back)"
            ]
          },
        ],
      },
      body: [
        {
          type: "Image",
          src: "https://polybit-apps.s3.amazonaws.com/stdlib/users/random-duck/profile/image.png?1643053848351",
          fit: "AspectFit"
        },
        {
          type: "Text",
          style: "h3",
          content: "Что такое eSIM?"
        },
        {
          type: "Text",
          style: "body",
          content: "eSIM - это траататоаатоататаоаоататоаотатоаат"
        }
      ]
    },
  ]
};

export default sampleData;
