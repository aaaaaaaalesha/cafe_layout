import { test, expect, type Page, mergeExpects } from "@playwright/test";
import { getBoundingBox } from "../utils";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("should have wrapper with header, main and footer divs", async ({
  page,
}) => {
  const wrapper = page.locator("#wrapper");
  await expect(wrapper).toBeVisible();

  const header = page.locator("#wrapper > #header");
  const main = page.locator("#wrapper > #main");
  const footer = page.locator("#wrapper > #footer");

  await expect(header).toBeVisible();
  await expect(main).toBeVisible();
  await expect(footer).toBeVisible();
});

test.describe("Header block", () => {
  test("should have background color", async ({ page }) => {
    const header = page.locator("#header");

    await expect(header).toHaveCSS("background-color", "rgb(107, 142, 35)");
  });

  test("should have padding 20px", async ({ page }) => {
    const header = page.locator("#header");

    await expect(header).toHaveCSS("padding-top", "20px");
    await expect(header).toHaveCSS("padding-bottom", "20px");
  });

  test("should match screenshot", async ({ page }) => {
    const header = page.locator("#header");

    await expect(header).toHaveScreenshot({
      maxDiffPixels: 100,
    });
  });
});

test.describe("Main block", () => {
  test.describe("About block", () => {
    test("should have about block", async ({ page }) => {
      const about = page.locator("#about");

      await expect(about).toBeVisible();
    });

    test("should have about text", async ({ page }) => {
      const about = page.locator("#about");

      const title = about.getByText("О нас");
      const description = about.getByText('Кафе "Уютное Место"');

      await expect(title).toBeVisible();
      await expect(description).toBeVisible();
    });

    test("should have correct width and paddings", async ({ page }) => {
      const about = page.locator("#about");
      const boundingBox = await getBoundingBox(about);

      await expect(boundingBox.width).toBe(280);
      await expect(about).toHaveCSS("padding", "15px");
    });

    test("description should not have margin-bottom", async ({ page }) => {
      const aboutDescription = page.locator("#about p");

      await expect(aboutDescription).toHaveCSS("margin-bottom", "0px");
    });

    test("heading should have margin-bottom 18px", async ({ page }) => {
      const aboutHeading = page.locator("#about > h2");

      await expect(aboutHeading).toHaveCSS("margin-bottom", "18px");
    });

    test("should match screenshot", async ({ page }) => {
      const about = page.locator("#about");

      await expect(about).toHaveScreenshot({
        maxDiffPixels: 100,
      });
    });
  });

  test.describe("Content block", () => {
    test("should have 4 card", async ({ page }) => {
      const cards = page.locator(".card");
      await expect(cards).toHaveCount(4);
    });

    test("should have 18px spacing between heading and first card", async ({
      page,
    }) => {
      const heading = page.locator("#content > h2");
      const firstCard = page.locator(".card").first();

      const headingBox = await getBoundingBox(heading);
      const firstCardBox = await getBoundingBox(firstCard);

      const headingYBottom = headingBox.bottomLeft[1];
      const firstCardY = firstCardBox.y;

      await expect(firstCardY - headingYBottom).toBe(18);
    });

    test("cards should have width 400px", async ({ page }) => {
      const cards = await page.locator(".card").all();

      await Promise.all(cards.map((card) => expect(card).toBeVisible()));

      const boxes = await Promise.all(
        cards.map((card) => getBoundingBox(card))
      );

      await Promise.all(boxes.map((box) => expect(box.width).toBe(400)));
    });

    test("cards should have spacing 20px", async ({ page }) => {
      const cards = await page.locator(".card").all();

      await Promise.all(cards.map((card) => expect(card).toBeVisible()));

      const boxes = await Promise.all(
        cards.map((card) => getBoundingBox(card))
      );

      for (let i = 0; i < boxes.length - 1; i += 1) {
        const distance = Math.abs(boxes[i + 1].y - boxes[i].bottomLeft[1]);

        await expect(distance).toBe(20);
      }
    });

    test("last cards should not have margin-bottom", async ({ page }) => {
      const card = await page.locator(".card").last();

      await expect(card).toHaveCSS("margin-bottom", "0px");
    });
  });

  test.describe("Sidebar block", () => {
    test("should have sidebar block", async ({ page }) => {
      const sidebar = page.locator("#sidebar");

      await expect(sidebar).toBeVisible();
    });

    test("should match screenshot", async ({ page }) => {
      const sidebar = page.locator("#sidebar");

      await expect(sidebar).toHaveScreenshot({
        maxDiffPixels: 100,
      });
    });

    test("sidebar block should have width 200px", async ({ page }) => {
      const sidebar = page.locator("#sidebar");

      const sidebarBox = await getBoundingBox(sidebar);

      await expect(sidebarBox.width).toBe(200);
    });

    test("sidebar should have padding 15px", async ({ page }) => {
      const sidebar = page.locator("#sidebar");
      await expect(sidebar).toHaveCSS("padding", "15px");
    });

    test("heading in sidebar should have 18px distance to next element", async ({
      page,
    }) => {
      const headings = await page.locator("#sidebar > h2").all();
      const nextElements = await page.locator("#sidebar > h2 + *").all();

      await Promise.all(nextElements.map((el) => expect(el).toBeVisible()));

      const headingBottomY = await Promise.all(
        headings.map((el) =>
          getBoundingBox(el).then((box) => box.bottomLeft[1])
        )
      );

      const elementsY = await Promise.all(
        nextElements.map((el) => getBoundingBox(el).then((box) => box.y))
      );

      await expect(headingBottomY.length, "Arrays length must be equal").toBe(
        elementsY.length
      );

      for (let i = 0; i < headingBottomY.length; i++) {
        const distance = Math.abs(headingBottomY[i] - elementsY[i]);
        await expect(distance).toBe(18);
      }
    });

    test("last element should not have additional spacing", async ({
      page,
    }) => {
      const sidebar = page.locator("#sidebar");
      const lastUl = page.locator("#sidebar > ul:last-child");
      await expect(lastUl).toBeVisible();

      await expect(lastUl).toHaveCSS("margin-bottom", "0px");
      await expect(lastUl).toHaveCSS("padding-bottom", "0px");

      const sidebarBox = await getBoundingBox(sidebar);
      const ulBox = await getBoundingBox(lastUl);
      const distance = Math.abs(sidebarBox.bottomLeft[1] - ulBox.bottomLeft[1]);
      await expect(distance).toBe(15);
    });
  });

  test("has spacing with about block equal to 20px", async ({ page }) => {
    const about = page.locator("#about");
    const content = page.locator("#content");

    const aboutBox = await getBoundingBox(about);
    const contentBox = await getBoundingBox(content);

    const distance = Math.abs(aboutBox.topRight[0] - contentBox.x);

    await expect(distance).toBe(20);
  });

  test("should have padding 20px", async ({ page }) => {
    const main = page.locator("#main");
    await expect(main).toHaveCSS("padding", "20px");
  });
});

test.describe("Footer block", () => {
  test("should have padding 10px", async ({ page }) => {
    const footer = page.locator("#footer");

    await expect(footer).toHaveCSS("padding-top", "10px");
    await expect(footer).toHaveCSS("padding-bottom", "10px");
  });

  test("should have margin-top 20px", async ({ page }) => {
    const footer = page.locator("#footer");

    await expect(footer).toHaveCSS("margin-top", "20px");
  });

  test("should have background color", async ({ page }) => {
    const footer = page.locator("#footer");

    await expect(footer).toHaveCSS("background-color", "rgb(107, 142, 35)");
  });

  test("should match screenshot", async ({ page }) => {
    const footer = page.locator("#footer");

    await expect(footer).toHaveScreenshot({
      maxDiffPixels: 100,
    });
  });
});
