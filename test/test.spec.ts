import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  console.log('this is the updated script');
  await page.goto('https://practicetestautomation.com/');
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot1.png"});
  await page.getByRole('link', { name: 'Practice', exact: true }).click();
  await page.getByRole('link', { name: 'Test Login Page' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('student');
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot2.png"});
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Password123');
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot3.png"});
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot4.png"});
  await page.getByRole('link', { name: 'Log out' }).click();
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screensho41.png"});
  await page.getByRole('link', { name: 'Courses' }).click();
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot5.png"});
  await page.getByRole('link', { name: 'Blog' }).click();
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot6.png"});
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot7.png"});
  await page.getByRole('link', { name: 'Home' }).click();
  await page.screenshot({ path: "/home/uncloud/monitorings/screenshots/screenshot8.png"});
});
