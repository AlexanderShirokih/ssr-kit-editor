const sampleData = {
  initialScreen: "first",
  screens: [
    {
      type: "RootView",
      tag: "first",
      appBar: {
        type: "TopBar",
        title: "Точка входа"
      },
      bottomBar: {
        type: "BottomControl",
        content: [
          {
            type: "Button",
            style: "primary",
            content: "Далее",
            tapActions: [
              "analytics(tap_button_next)",
              "push(second)"
            ]
          }
        ]
      }
    },
    {
      type: "RootView",
      tag: "second",
      appBar: {
        type: "TopBar",
        title: "Экран 2"
      },
      bottomBar: {
        type: "BottomControl",
        content: [
          {
            type: "Spacer",
            spacing: 6
          },
          {
            type: "Button",
            style: "primary",
            content: "Завершить",
            tapActions: [
              "push(success)"
            ]
          }
        ]
      },
      body: [
        {
          type: "Spacer",
          spacing: 24
        },
        {
          type: "Image",
          "src": "https://polybit-apps.s3.amazonaws.com/stdlib/users/random-duck/profile/image.png?164305384835"
        },
        {
          type: "Container",
          "direction": "horizontal",
          content: [
            {
              type: "Text",
              style: "body1",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
              type: "Text",
              style: "body1",
              content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          ]
        }
      ]
    },
    {
      type: "RootView",
      tag: "success",
      appearActions: [
        "analytics(success_shown, key1=param1, key2=param2)"
      ],
      disappearActions: [
        "analytics(success_closed, key1=param1, key2=param2)"
      ],
      appBar: {
        type: "TopBar"
      },
      bottomBar: {
        type: "BottomControl",
        content: [
          {
            type: "Spacer",
            spacing: 6
          },
          {
            type: "Button",
            style: "primary",
            content: "На главную",
            tapActions: [
              "navigate(first)"
            ]
          }
        ]
      },
      body: [
        {
          type: "Center",
          content: {
            type: "Container",
            align: "center",
            content: [
              {
                type: "Icon",
                "name": "ic_success"
              },
              {
                type: "Text",
                style: "h3",
                content: "Успешный успех!"
              },
              {
                type: "Spacer",
                spacing: 4
              },
              {
                type: "Text",
                style: "body2",
                content: "Можно вернуться в начало флоу"
              }
            ]
          }
        }
      ]
    }
  ]
};

export default sampleData;
