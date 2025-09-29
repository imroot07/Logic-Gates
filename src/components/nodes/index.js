"use client";

import Button, { generateDefaultButtonData } from "./Button";
import Switch, { generateDefaultSwitchData } from "./Switch";
import MultiSwitch, { generateDefaultMultiSwitchData } from "./MultiSwitch";
import Clock, { generateDefaultClockData } from "./Clock";
import Lamp, { generateDefaultLampData } from "./Lamp";
import MultiLamp, { generateDefaultMultiLampData } from "./MultiLamp";
import SevenSegmentLamp, {
  generateDefaultSevenSegmentLampData,
} from "./SevenSegmentLamp";
import Gate, { generateDefaultGateData } from "./Gate";
import StateGate, {generateDefaultStateGateData} from "./StateGate";

const Nodes = {
  Button,
  Switch,
  MultiSwitch,
  Lamp,
  MultiLamp,
  SevenSegmentLamp,
  Gate,
  StateGate,
};

const Generators = {
  generateDefaultButtonData,
  generateDefaultSwitchData,
  generateDefaultMultiSwitchData,
  generateDefaultClockData,
  generateDefaultLampData,
  generateDefaultMultiLampData,
  generateDefaultSevenSegmentLampData,
  generateDefaultGateData,
  generateDefaultStateGateData
};

export { Nodes, Generators };
