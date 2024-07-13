import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Turn {
  'id' : bigint,
  'status' : bigint,
  'name' : string,
  'office' : string,
}
export interface _SERVICE {
  'addTurn' : ActorMethod<[string, string], bigint>,
  'getCurrentTurn' : ActorMethod<[], [] | [Turn]>,
  'greet' : ActorMethod<[string], string>,
  'nextTurn' : ActorMethod<[], undefined>,
  'showTurns' : ActorMethod<[], Array<Turn>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
