import jest from "jest-lite";
import { v4 as uuid } from "uuid";

export const evaluate = async (code, assertions) => {
  const id = uuid();
  const js = `
      let ____xe = '';

      with(jest) {
        (() => { 
          ${code} 

          ;

          describe('${id}', () => {
            ${assertions}
          });
          ____xe = '${id}';
        })();
      }

      return [____xe, await jest.run()];
    `;

  try {
    jest.jest.resetAllMocks();
    jest.jest.clearAllMocks();

    let response = await Object.getPrototypeOf(
      async function () {}
    ).constructor(
      "jest",
      js
    )(jest);

    if (!response || response[0] !== id) {
      throw new Error(
        "Did not complete running - are you calling `return` in your code?"
      );
    }

    const res = response[1].filter((r) => r.testPath.includes(id));

    if (!res.length) {
      return {
        completed: true,
        lines: [
          {
            success: true,
            title: "Passed",
            message: "Ran without errors",
          },
        ],
      };
    }

    const completed = res.every((r) => r.status === "pass");
    return {
      completed,
      lines: res.map((r) => ({
        success: r.status === "pass",
        fail: r.status === "fail",
        message: r.testPath.slice(2).join(" - ")
      })),
    };
  } catch (e) {
    console.log({ e });

    return {
      completed: false,
      lines: [
        {
          fail: true,
          title: "Error",
          message: e.message,
        },
      ],
    };
  }
};
