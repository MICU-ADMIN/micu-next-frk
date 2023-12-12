"use client";

import { useState } from "react";
// import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import {
  Card,
  TabList,
  Tab,
  ProgressBar,
  Text,
  Flex,
  Button,
  Metric,
  BadgeDelta,
  AreaChart,
  TabGroup,
} from "@tremor/react";

const sales = [
  {
    Month: "Jan 21",
    Sales: 2890,
  },
  {
    Month: "Feb 21",
    Sales: 1890,
  },
  // ...
  {
    Month: "Dec 21",
    Sales: 3350,
  },
];

const products = [
  {
    title: "Product A",
    value: 38,
    metric: "$ 100,838",
    location: "A",
  },
  {
    title: "Product B",
    value: 34,
    metric: "$ 90,224",
    location: "A",
  },
  // ...
  {
    title: "Product N",
    value: 8,
    metric: "$ 10,614",
    location: "B",
  },
];

const valueFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export function Website() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLocation = selectedIndex === 0 ? "A" : "B";

  return (
    <Card className="max-w-md mx-auto">
      <Flex alignItems="start">
        <Text>Total Sales</Text>
        <BadgeDelta deltaType="moderateIncrease">23.1%</BadgeDelta>
      </Flex>
      <Flex
        justifyContent="start"
        alignItems="baseline"
        className="space-x-3 truncate"
      >
        <Metric>$442,276</Metric>
        <Text>from $382,482</Text>
      </Flex>
      <AreaChart
        className="mt-10 h-48"
        data={sales}
        index="Month"
        categories={["Sales"]}
        colors={["primary"]}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        valueFormatter={valueFormatter}
      />
      <TabGroup
        className="mt-4"
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
      >
        <TabList>
          <Tab>Location A</Tab>
          <Tab>Location B</Tab>
        </TabList>
      </TabGroup>
      {products
        .filter((item: any) => item.location === selectedLocation)
        .map((item: any) => (
          <div key={item.title} className="mt-4 space-y-2">
            <Flex>
              <Text>{item.title}</Text>
              <Text>{`${item.value}% (${item.metric})`}</Text>
            </Flex>
            <ProgressBar value={item.value} />
          </div>
        ))}
      <Flex className="mt-6 pt-4 border-t">
        <Button
          size="xs"
          variant="light"
          //   icon={ArrowNarrowRightIcon}
          iconPosition="right"
        >
          View more
        </Button>
      </Flex>
    </Card>
  );
}
