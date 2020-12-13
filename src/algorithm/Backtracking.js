export default async function backtracking(locations, budget, distanceMatrix) {
    const n = locations.length;
    let stack = [{ node: 0, currVisit: 0, currCost: 0, currScore: 0 }]; // origin index is 0
    let maxScore = 0;
    let maxRoute = [0];
    while (stack.length > 0) {
        let curr = stack[stack.length - 1];
        if (curr.currVisit === n) {
            stack.pop();
        } else {
            let next = curr.currVisit;
            let currCost = curr.currCost;
            let currScore = curr.currScore;
            curr.currVisit++;
            stack[stack.length - 1] = curr;
            //
            let newCost = currCost + distanceMatrix[curr.node][next] + locations[next].cost;
            let returnCost = distanceMatrix[next][0];
            let newScore = currScore + locations[next].score;
            if (!stack.some(p => p.node === next) && newCost + returnCost <= budget) {
                stack.push({
                    node: next,
                    currVisit: 0,
                    currCost: newCost,
                    currScore: newScore
                });
                if (newScore > maxScore) {
                    console.log('new routes found with cost:', newCost);
                    maxRoute = stack.map(p => p.node);
                }
            }
        }
    }
    return maxRoute;
}