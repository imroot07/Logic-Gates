import ButtonNode from "./ButtonNode";
import SwitchNode from "./SwitchNode";
import MultiSwitchNode from "./MultiSwitchNode";
import LampNode from "./LampNode";
import MultiLampNode from "./MultiLampNode";
import SevenSegmentLampNode from "./SevenSegmentLampNode";
import TableGateNode from "./TableGateNode";
import DecoderNode from "./DecoderNode";
import RegisterNode from "./RegisterNode";
import MultiRegisterNode from "./MultiRegisterNode";
import ShiftRegisterNode from "./ShiftRegisterNode";
import ShiftRegisterWithLoadNode from "./ShiftRegisterWithLoadNode";
import DelayNode from "./DelayNode";
import ClockNode from "./ClockNode";

export const nodeTypes = {
  button: ButtonNode,
  switch: SwitchNode,
  multiSwitch: MultiSwitchNode,
  lamp: LampNode,
  multiLamp: MultiLampNode,
  sevenSegmentLamp: SevenSegmentLampNode,
  tableGate: TableGateNode,
  decoder: DecoderNode,
  register: RegisterNode,
  multiRegister: MultiRegisterNode,
  shiftRegister: ShiftRegisterNode,
  shiftRegisterWithLoad: ShiftRegisterWithLoadNode,
  delay: DelayNode,
  clock: ClockNode,
};
