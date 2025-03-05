const SATInstance = require('sat-solver-js');
const sat = new SATInstance();

/**
 * Variables (16 total):
 *   BCat, BDog, BBird, BFish    => Bob's Cat, Dog, Bird, Fish
 *   MCat, MDog, MBird, MFish    => Mary's Cat, Dog, Bird, Fish
 *   CCat, CDog, CBird, CFish    => Cathy's Cat, Dog, Bird, Fish
 *   SCat, SDog, SBird, SFish    => Sue's Cat, Dog, Bird, Fish
 */

sat.parseClause('BCat BDog BBird BFish');
sat.parseClause('~BCat ~BDog');
sat.parseClause('~BCat ~BBird');
sat.parseClause('~BCat ~BFish');
sat.parseClause('~BDog ~BBird');
sat.parseClause('~BDog ~BFish');
sat.parseClause('~BBird ~BFish');

sat.parseClause('MCat MDog MBird MFish');
sat.parseClause('~MCat ~MDog');
sat.parseClause('~MCat ~MBird');
sat.parseClause('~MCat ~MFish');
sat.parseClause('~MDog ~MBird');
sat.parseClause('~MDog ~MFish');
sat.parseClause('~MBird ~MFish');

sat.parseClause('CCat CDog CBird CFish');
sat.parseClause('~CCat ~CDog');
sat.parseClause('~CCat ~CBird');
sat.parseClause('~CCat ~CFish');
sat.parseClause('~CDog ~CBird');
sat.parseClause('~CDog ~CFish');
sat.parseClause('~CBird ~CFish');

sat.parseClause('SCat SDog SBird SFish');
sat.parseClause('~SCat ~SDog');
sat.parseClause('~SCat ~SBird');
sat.parseClause('~SCat ~SFish');
sat.parseClause('~SDog ~SBird');
sat.parseClause('~SDog ~SFish');
sat.parseClause('~SBird ~SFish');

sat.parseClause('BCat MCat CCat SCat');
sat.parseClause('~BCat ~MCat');
sat.parseClause('~BCat ~CCat');
sat.parseClause('~BCat ~SCat');
sat.parseClause('~MCat ~CCat');
sat.parseClause('~MCat ~SCat');
sat.parseClause('~CCat ~SCat');

sat.parseClause('BDog MDog CDog SDog');
sat.parseClause('~BDog ~MDog');
sat.parseClause('~BDog ~CDog');
sat.parseClause('~BDog ~SDog');
sat.parseClause('~MDog ~CDog');
sat.parseClause('~MDog ~SDog');
sat.parseClause('~CDog ~SDog');

sat.parseClause('BBird MBird CBird SBird');
sat.parseClause('~BBird ~MBird');
sat.parseClause('~BBird ~CBird');
sat.parseClause('~BBird ~SBird');
sat.parseClause('~MBird ~CBird');
sat.parseClause('~MBird ~SBird');
sat.parseClause('~CBird ~SBird');

sat.parseClause('BFish MFish CFish SFish');
sat.parseClause('~BFish ~MFish');
sat.parseClause('~BFish ~CFish');
sat.parseClause('~BFish ~SFish');
sat.parseClause('~MFish ~CFish');
sat.parseClause('~MFish ~SFish');
sat.parseClause('~CFish ~SFish');

sat.parseClause('BDog');
sat.parseClause('SBird');
sat.parseClause('~MFish');

const solutions = sat.solutions();

if (solutions.length === 0) {
  console.log("Puzzle is UNSATISFIABLE!");
} else {
  console.log("Puzzle is SATISFIABLE! Number of solutions:", solutions.length);
  solutions.forEach((sol, idx) => {
    console.log(`Solution #${idx + 1}:`, sol);
  });
}