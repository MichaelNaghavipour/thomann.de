# Thomann.de Test Automation Framework

This project implements a test automation framework for the Thomann.de website using Playwright, focusing on the CableGuy feature. The framework follows the Page Object Model pattern and best practices for test automation.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

## Project Structure

```
thomann.de/
├── tests/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts     # Base page class with common methods
│   │   └── CableGuyPage.ts # CableGuy page specific methods
│   ├── specs/             # Test specifications
│   │   └── cableGuyProductSelection.spec.ts
│   └── utils/             # Utility functions
│       └── randomUtils.ts
├── playwright.config.ts   # Playwright configuration
├── package.json          # Project dependencies and scripts
└── README.md            # Project documentation
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd thomann.de
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Basic Test Execution
```bash
npm test
```

### Run Tests with UI Mode
```bash
npm run test:ui
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests with Debug Mode
```bash
npm run test:debug
```

### Generate and View Test Reports
```bash
# Generate HTML report
npm run test:report

# View the generated report
npm run report:show
```

## Test Reports

The framework generates comprehensive HTML reports that include:
- Test execution results (passed/failed)
- Test execution time
- Screenshots (on failure)
- Videos (on failure)
- Test steps and their duration
- Error messages and stack traces
- Test artifacts

Reports are generated in the `playwright-report` directory.

## Test Scenarios

The framework currently implements the following test scenario:

### CableGuy Product Selection Test
1. **Step 1: Cable Beginning Selection**
   - Click on the "Cable Beginning" section
   - Select a random Cable Type
   - Select a random Cable Connection

2. **Step 2: Cable End Selection**
   - Click on the "Cable End" section
   - Select a random Cable Type
   - Select a random Cable Connection

3. **Step 3: Manufacturer Selection and Validation**
   - Choose a random Manufacturer from available options
   - Validate that the number of products displayed matches the count shown below the manufacturer's logo

4. **Step 4: Product Selection and Verification**
   - Click on a random product from the filtered list
   - Verify that the correct product page is opened by comparing product titles

5. **Step 5: Basket Operations**
   - Add the selected product to the shopping basket
   - Verify the accuracy of the Basket Notification Popup

## Framework Features

- **Page Object Model**: Implements the POM pattern for better maintainability
- **Random Selection**: Utility functions for random element selection
- **Screenshots & Videos**: Automatic capture on test failures
- **HTML Reports**: Detailed test execution reports
- **TypeScript**: Type-safe test implementation
- **ESLint**: Code quality and style enforcement

## Best Practices Implemented

1. **Code Organization**
   - Separation of concerns using Page Object Model
   - Reusable utility functions
   - Clear project structure

2. **Test Design**
   - Independent test cases
   - Clear test descriptions
   - Proper assertions

3. **Maintainability**
   - Centralized selectors
   - Reusable page methods
   - Type safety with TypeScript

4. **Reporting**
   - Comprehensive HTML reports
   - Failure artifacts (screenshots, videos)
   - Detailed test steps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License
