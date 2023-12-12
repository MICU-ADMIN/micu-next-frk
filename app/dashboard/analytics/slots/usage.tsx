import {
  Callout,
  Card,
  Text,
  Flex,
  CategoryBar,
  Grid,
  Icon,
  Title,
  Bold,
  ProgressBar,
  List,
  ListItem,
} from "@tremor/react";

// import {
//   ChevronDoubleRightIcon,
//   ExclamationIcon,
//   MoonIcon,
//   UserIcon,
//   UserGroupIcon,
// } from "@heroicons/react/solid";

export default function Usage() {
  return (
    <Grid numItemsSm={1} numItemsLg={1} className="gap-4 ">
      <Card className="max-w-md mx-auto">
        <Flex className="truncate" justifyContent="between">
          <Flex className="truncate" justifyContent="start">
            <Text>
              <Bold>Zurich</Bold>
            </Text>
            {/* <Icon
              variant="simple"
              icon={ChevronDoubleRightIcon}
              size="xs"
              color="slate"
            /> */}
            <Text className="truncate">
              <Bold>Vienna</Bold>
            </Text>
          </Flex>
          <Text color="primary">
            <Bold>On time</Bold>
          </Text>
        </Flex>
        <ProgressBar color="primary" value={61} className="mt-3" />
        <Flex justifyContent="between" className="mt-3">
          <div>
            <Title>10:40</Title>
            <Text>Platform 2</Text>
          </div>
          <div>
            <Text className="text-center">7H 50M</Text>
          </div>
          <div className="text-right">
            <Title>18:30</Title>
            <Text className="text-right">No Reservation</Text>
          </div>
        </Flex>
      </Card>
      <Card className="max-w-md mx-auto">
        <Flex className="truncate" justifyContent="between">
          <Flex className="truncate" justifyContent="start">
            <Text>
              <Bold>Vienna</Bold>
            </Text>
            {/* <Icon
              variant="simple"
              icon={ChevronDoubleRightIcon}
              size="xs"
              color="slate"
            /> */}
            <Text className="truncate">
              <Bold>St. Anton am Arlberg </Bold>
            </Text>
          </Flex>
          <Text color="rose">
            <Bold>Delayed</Bold>
          </Text>
        </Flex>
        <ProgressBar
          value={65}
          showAnimation={true}
          color="rose"
          className="mt-3"
        />
        <Flex justifyContent="between" className="mt-3">
          <div>
            <Title>13:30</Title>
            <Text>Sched. 13:30</Text>
          </div>
          <div className="text-right">
            <Title>19:40</Title>
            <Text className="text-right">Sched. 18:55</Text>
          </div>
        </Flex>
        <Callout
          title="+45 minutes behind plan"
          //   icon={ExclamationIcon}
          color="rose"
          className="mt-6"
        >
          Due to maintenance work, we have a minor delay. If you need assistance
          with your travels today please contact the info hotline.
        </Callout>
      </Card>
      <Card className="max-w-md mx-auto">
        <Flex justifyContent="start">
          <Text>
            <Bold>Nightjet Direction Bregenz</Bold>
          </Text>
          {/* <Icon variant="simple" icon={MoonIcon} size="xs" color="slate" /> */}
        </Flex>
        <Flex justifyContent="between" className="mt-3 space-x-3">
          <Title>22:55</Title>
          <div className="w-full">
            <CategoryBar
              values={[75, 15, 10]}
              markerValue={75}
              colors={["yellow", "gray", "gray"]}
              showLabels={false}
            />
          </div>
          <Title>10:22</Title>
        </Flex>
        <Flex className="mt-3">
          <div>
            <Flex
              alignItems="baseline"
              justifyContent="start"
              className="space-x-2"
            >
              <Flex justifyContent="start" alignItems="baseline">
                <Text>1st</Text>
                {/* <Icon
                  variant="simple"
                  icon={UserIcon}
                  size="xs"
                  color="slate"
                /> */}
              </Flex>
              <Flex justifyContent="start" alignItems="baseline">
                <Text>2nd</Text>
                {/* <Icon
                  variant="simple"
                  icon={UserGroupIcon}
                  size="xs"
                  color="slate"
                /> */}
              </Flex>
            </Flex>
          </div>
          <Text>11H 22M</Text>
        </Flex>
        <List className="mt-4">
          <ListItem>
            <div>
              <Text>
                <Bold>22:55</Bold> Vienna{" "}
              </Text>
              <Text>
                <Bold>07:49</Bold> Feldkirch{" "}
              </Text>
            </div>
            <div>
              <Text className="text-right">
                <Bold>Pl. 1</Bold>{" "}
              </Text>
              <Text className="text-right">
                <Bold>Pl. 9</Bold>{" "}
              </Text>
            </div>
          </ListItem>
          <ListItem>
            <div>
              <Text>
                <Bold>08:05</Bold> Feldkirch{" "}
              </Text>
              <Text>
                <Bold>08:28</Bold> Buchs SG{" "}
              </Text>
            </div>
            <div>
              <Text className="text-right">
                <Bold>Pl. 7</Bold>{" "}
              </Text>
              <Text className="text-right">
                <Bold>Pl. 3</Bold>{" "}
              </Text>
            </div>
          </ListItem>
          <ListItem>
            <div>
              <Text>
                <Bold>08:30</Bold> Buchs SG{" "}
              </Text>
              <Text>
                <Bold>10:22</Bold> Zurich HB{" "}
              </Text>
            </div>
            <div>
              <Text className="text-right">
                <Bold>Pl. 5</Bold>{" "}
              </Text>
              <Text className="text-right">
                <Bold>Pl. 6</Bold>{" "}
              </Text>
            </div>
          </ListItem>
        </List>
      </Card>
    </Grid>
  );
}
