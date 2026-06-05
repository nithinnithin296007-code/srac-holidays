import { test, expect } from '@playwright/test';

test.describe('SRAC Holidays Forms Integration Tests', () => {

  test('TripBuilder flow behaves correctly and validates inputs', async ({ page }) => {
    // 1. Go to homepage
    await page.goto('/');

    // 2. Select an experience card (Step 1)
    const experienceCard = page.locator('.tb__interest-item').first();
    await expect(experienceCard).toBeVisible();
    await experienceCard.click();

    // 3. Click Next Step
    const nextBtn = page.locator('.tb__next-btn');
    await nextBtn.click();

    // 4. Select Duration & Group Size options (Step 2)
    const durationOption = page.locator('.tb__option-item').first();
    await durationOption.click();
    await nextBtn.click();

    // 5. Submit empty details to trigger validation (Step 3)
    await nextBtn.click();

    // Check validation error messages
    await expect(page.locator('text=Your name is required')).toBeVisible();
    await expect(page.locator('text=Phone number is required')).toBeVisible();
    await expect(page.locator('text=Travel date is required')).toBeVisible();

    // 6. Fill in name and verify error disappears
    const nameInput = page.locator('input[placeholder="Enter name"]');
    await nameInput.fill('John Doe');
    await expect(page.locator('text=Your name is required')).not.toBeVisible();

    // 7. Fill in invalid phone and verify error
    const phoneInput = page.locator('input[placeholder="e.g. +91 98765 43210"]');
    await phoneInput.fill('123');
    await nextBtn.click();
    await expect(page.locator('text=Please enter a valid phone number')).toBeVisible();

    // Fill in valid phone number
    await phoneInput.fill('+91 98765 43210');
    await expect(page.locator('text=Please enter a valid phone number')).not.toBeVisible();

    // 8. Fill in travel date
    const dateInput = page.locator('input[placeholder="Preferred Date / Range"]');
    await dateInput.fill('December 15, 2026');
    await expect(page.locator('text=Travel date is required')).not.toBeVisible();

    // 9. Mock window.open to test final submit
    await page.evaluate(() => {
      window.open = (url) => {
        window.__lastOpenedUrl = url;
        return null;
      };
    });

    // Proceed to Step 4 (Summary)
    await nextBtn.click();

    // Verify summary details are correct
    await expect(page.locator('.tb__summary-box')).toBeVisible();
    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=+91 98765 43210')).toBeVisible();
    await expect(page.locator('text=December 15, 2026')).toBeVisible();

    // Click WhatsApp Enquire button
    const waBtn = page.locator('.tb__wa-btn');
    await expect(waBtn).toBeVisible();
    await waBtn.click();

    // Assert WhatsApp link was generated and contains correct text
    const openedUrl = await page.evaluate(() => window.__lastOpenedUrl);
    expect(openedUrl).toContain('wa.me');
    const decodedUrl = decodeURIComponent(openedUrl);
    expect(decodedUrl).toContain('John Doe');
  });

  test('CarRentals Quick Enquiry sidebar flow behaves correctly and validates inputs', async ({ page }) => {
    // 1. Go to Car Rentals page
    await page.goto('/car-rentals');

    // 2. Click a car card to open the enquiry sidebar
    const carCard = page.locator('.cr-card').first();
    await expect(carCard).toBeVisible();
    await carCard.click();

    // Verify sidebar is now visible
    const sidebar = page.locator('.cr-sidebar');
    await expect(sidebar).toBeVisible();
    await expect(sidebar.locator('text=Quick Enquiry')).toBeVisible();

    // 3. Click submit to trigger validation
    const waEnquireBtn = sidebar.locator('.cr-sb__wa');
    await waEnquireBtn.click();

    // Verify error messages appear
    await expect(sidebar.locator('text=Your name is required')).toBeVisible();
    await expect(sidebar.locator('text=Travel details are required')).toBeVisible();

    // 4. Fill in name and verify error disappears
    const nameInput = sidebar.locator('input[placeholder="So we can address you properly"]');
    await nameInput.fill('Alice Smith');
    await expect(sidebar.locator('text=Your name is required')).not.toBeVisible();

    // 5. Fill in travel details too short
    const detailsTextarea = sidebar.locator('textarea[placeholder="Date, pickup location, destination..."]');
    await detailsTextarea.fill('short');
    await waEnquireBtn.click();
    await expect(sidebar.locator('text=Please enter more details')).toBeVisible();

    // Fill in valid details length
    await detailsTextarea.fill('December 15, 9:00 AM, Airport to South Mumbai hotel');
    await expect(sidebar.locator('text=Please enter more details')).not.toBeVisible();

    // 6. Mock window.open to verify submission
    await page.evaluate(() => {
      window.open = (url) => {
        window.__lastOpenedUrl = url;
        return null;
      };
    });

    // Click submit
    await waEnquireBtn.click();

    // Assert WhatsApp link was generated and contains correct details
    const openedUrl = await page.evaluate(() => window.__lastOpenedUrl);
    expect(openedUrl).toContain('wa.me');
    const decodedUrl = decodeURIComponent(openedUrl);
    expect(decodedUrl).toContain('Alice Smith');
    expect(decodedUrl).toContain('Airport to South Mumbai hotel');
  });

});
