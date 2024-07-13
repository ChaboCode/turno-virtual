export const idlFactory = ({ IDL }) => {
  const Turn = IDL.Record({
    'id' : IDL.Int,
    'status' : IDL.Int,
    'name' : IDL.Text,
    'office' : IDL.Text,
  });
  return IDL.Service({
    'addTurn' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'getCurrentTurn' : IDL.Func([], [IDL.Opt(Turn)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'nextTurn' : IDL.Func([], [], ['oneway']),
    'showTurns' : IDL.Func([], [IDL.Vec(Turn)], []),
  });
};
export const init = ({ IDL }) => { return []; };
