import {
  RuntimeModule,
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { StateMap, assert } from "@proto-kit/protocol";
import { PublicKey } from "o1js";
import { CheckIn } from "./check-in";
import { UInt64 } from "@proto-kit/library";

@runtimeModule()
export class GuestBook extends RuntimeModule<Record<string, never>> {
  @state() public checkIns = StateMap.from(PublicKey, CheckIn);


}