/**
 * WISER WORKFLOWS - Interactive ROI & Time-Savings Calculator
 * Calculates financial savings, reclaimed hours, and capacity multiplier with live slider reactivity.
 */

document.addEventListener('DOMContentLoaded', () => {
  const teamSizeSlider = document.getElementById('calc-team-size');
  const hoursSlider = document.getElementById('calc-hours-week');
  const wageSlider = document.getElementById('calc-hourly-wage');

  const teamSizeBadge = document.getElementById('val-team-size');
  const hoursBadge = document.getElementById('val-hours-week');
  const wageBadge = document.getElementById('val-hourly-wage');

  const annualDollarsElem = document.getElementById('result-annual-dollars');
  const annualHoursElem = document.getElementById('result-annual-hours');
  const monthlySavingsElem = document.getElementById('result-monthly-savings');
  const fteEquivalentElem = document.getElementById('result-fte-equivalent');

  if (!teamSizeSlider || !hoursSlider || !wageSlider) return;

  const AUTOMATION_EFFICIENCY = 0.70; // 70% average automation of manual repetitive tasks
  const WEEKS_PER_YEAR = 50;

  function updateCalculations() {
    const teamSize = parseInt(teamSizeSlider.value, 10);
    const hoursPerWeek = parseInt(hoursSlider.value, 10);
    const hourlyWage = parseInt(wageSlider.value, 10);

    // Update slider badges
    if (teamSizeBadge) teamSizeBadge.textContent = `${teamSize} ${teamSize === 1 ? 'person' : 'people'}`;
    if (hoursBadge) hoursBadge.textContent = `${hoursPerWeek} hrs / person`;
    if (wageBadge) wageBadge.textContent = `$${hourlyWage} / hr`;

    // Formulas
    const totalAnnualManualHours = teamSize * hoursPerWeek * WEEKS_PER_YEAR;
    const annualHoursSaved = Math.round(totalAnnualManualHours * AUTOMATION_EFFICIENCY);
    const annualDollarsSaved = Math.round(annualHoursSaved * hourlyWage);
    const monthlyDollarsSaved = Math.round(annualDollarsSaved / 12);
    const fteEquivalent = (annualHoursSaved / (WEEKS_PER_YEAR * 40)).toFixed(1);

    // Animate / Display Results
    if (annualDollarsElem) {
      annualDollarsElem.textContent = `$${annualDollarsSaved.toLocaleString()}`;
    }
    if (annualHoursElem) {
      annualHoursElem.textContent = `${annualHoursSaved.toLocaleString()} hrs`;
    }
    if (monthlySavingsElem) {
      monthlySavingsElem.textContent = `$${monthlyDollarsSaved.toLocaleString()}/mo`;
    }
    if (fteEquivalentElem) {
      fteEquivalentElem.textContent = `+${fteEquivalent} FTEs`;
    }
  }

  // Bind input events
  teamSizeSlider.addEventListener('input', updateCalculations);
  hoursSlider.addEventListener('input', updateCalculations);
  wageSlider.addEventListener('input', updateCalculations);

  // Preset Scenario Buttons
  const presetButtons = document.querySelectorAll('[data-preset]');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const preset = btn.dataset.preset;
      if (preset === 'startup') {
        teamSizeSlider.value = 5;
        hoursSlider.value = 8;
        wageSlider.value = 45;
      } else if (preset === 'midmarket') {
        teamSizeSlider.value = 25;
        hoursSlider.value = 12;
        wageSlider.value = 65;
      } else if (preset === 'enterprise') {
        teamSizeSlider.value = 75;
        hoursSlider.value = 15;
        wageSlider.value = 85;
      }
      updateCalculations();
    });
  });

  // Initial Calculation Run
  updateCalculations();
});
