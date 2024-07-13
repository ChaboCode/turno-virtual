import Hash "mo:base/Hash";
import Map "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

actor Database {
    var nextId = 0;
    var currentId = 0;
    type Turn = {
        name : Text;
        id : Int;
        office : Text;
        status : Int; // 0: Pending
        // 1: Attended
        // 2: Skipped
    };

    func natHash(n : Nat) : Hash.Hash {
        Text.hash(Nat.toText(n));
    };

    var turns = Map.HashMap<Nat, Turn>(0, Nat.equal, natHash);

    public func showTurns() : async [Turn] {
        Iter.toArray(turns.vals());
    };

    public func addTurn(name : Text, office : Text) : async Nat {
        let id = nextId;
        turns.put(id, { id = id; name = name; office = office; status = 0 });
        nextId+=1;
        nextId;
    };

    public func getCurrentTurn() : async ?Turn {
        turns.get(currentId);
    };

    public func nextTurn() {
        currentId += 1;
    };

    public query func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
};
