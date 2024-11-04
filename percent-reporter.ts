import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

class PercentReporter implements Reporter {
  private totalTest = 0;
  private successTests = 0;
  private failedTests = 0;
  private failedTestsNames: Array<{
    path: string;
    status: TestResult["status"];
  }> = [];

  onBegin(config: FullConfig, suite: Suite) {
    this.totalTest = suite.allTests().length;
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === "passed") {
      this.successTests += 1;
    } else {
      this.failedTests += 1;
      this.failedTestsNames.push({
        path: test.titlePath().filter(Boolean).join(" > "),
        status: result.status,
      });
    }
  }

  onEnd(result: FullResult) {
    const percent = Math.round((this.successTests / this.totalTest) * 100);

    console.table([
      {
        Total: this.totalTest,
        Passed: this.successTests,
        Failed: this.failedTests,
        Percent: percent,
      },
    ]);

    if (this.failedTestsNames.length > 0) {
      console.log("Failed tests:");
      console.table(this.failedTestsNames);
    }
  }
}

export default PercentReporter;
