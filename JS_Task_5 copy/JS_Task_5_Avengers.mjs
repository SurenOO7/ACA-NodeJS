import names from "./names.mjs"

const team = ["villians", "heroes"]
const PlayerNumberInEachTeam = 3;

class Heroes {
    giveName = () => {
        return names[Math.floor(Math.random()*names.length)];
    }
    giveSpeed = () => {
        return Math.floor((Math.random()*5)+1);
    }
    givePower = () => {
        return Math.floor((Math.random()*9+1)*100)/100;
    }
    attack = (victim) => {
        victim.health = Math.floor((victim.health - this.power)*100)/100
    }
    constructor(side){
        this.team=side;
        this.name=this.giveName();
        this.speed=this.giveSpeed();
        this.health=100;
        side !== team[0] ? this.power=this.givePower()+5 : this.power=this.givePower()+7;
        this.setIntervalID = 0;
    }
}

const CreatePlayers = (count, side) => {
    let players=[]
        for(let i=0; i<count; i++){
            players.push(new Heroes(side))
        }
    return players
}

const createSides = () => {
    return team.map((elem) => {
        return CreatePlayers(PlayerNumberInEachTeam, elem)
    })
}

const chooseTheVictim = (range) =>{
    return Math.floor(Math.random()*range)
}

const LetsTheGameBegin = () =>{
    let Warriors = createSides()
    for(let teamNumber=0; teamNumber<team.length; teamNumber++){
        for(let playerNumber=0; playerNumber<Warriors[teamNumber].length; playerNumber++){
            let setIntervalID = setInterval(() => {
                if(!Warriors[teamNumber][playerNumber]){
                    console.log("Already Dead------------", teamNumber, "__", playerNumber)
                    return
                }
                if(team.length === 1){
                    console.log("Zis is Ze END------------")
                    console.log("NAME ist", Warriors[teamNumber][playerNumber].name)
                    clearInterval(Warriors[teamNumber][playerNumber].setIntervalID)
                    return
                }
                let theVictimTeam = chooseTheVictim(team.length)
                while(team[theVictimTeam] === Warriors[teamNumber][playerNumber].team){
                    if(team.length === 1){
                        console.log("Zis is Ze END------------")
                        clearInterval(Warriors[teamNumber][playerNumber].setIntervalID)
                        break
                    }
                    theVictimTeam = chooseTheVictim(team.length)
                }
                let theVictimPlayer = chooseTheVictim(Warriors[theVictimTeam].length)
                console.log(team[teamNumber],"---", Warriors[teamNumber].length)
                console.log(team[theVictimTeam],"---", Warriors[theVictimTeam].length)
                if (Warriors[theVictimTeam][theVictimPlayer].health>0){
                    Warriors[teamNumber][playerNumber].attack(Warriors[theVictimTeam][theVictimPlayer])
                    console.log(Warriors[teamNumber][playerNumber].name, "[",
                        Warriors[teamNumber][playerNumber].health, "]",
                        Warriors[teamNumber][playerNumber].team, " hits ",
                        Warriors[theVictimTeam][theVictimPlayer].name, "[",
                        Warriors[theVictimTeam][theVictimPlayer].health, "]",
                        Warriors[theVictimTeam][theVictimPlayer].team, " with a power of ",
                        Warriors[teamNumber][playerNumber].power)

                    if (Warriors[theVictimTeam][theVictimPlayer].health<0){
                        clearInterval(Warriors[theVictimTeam][theVictimPlayer].setIntervalID)
                        console.log(Warriors[theVictimTeam][theVictimPlayer].name, " dies")
                        Warriors[theVictimTeam].splice(theVictimPlayer, 1)
                        if(Warriors[theVictimTeam].length === 0) {
                            team.splice(theVictimTeam, 1)
                            console.log("Team after ", team)
                        }
                    }
                }
                else{
                    clearInterval(Warriors[theVictimTeam][theVictimPlayer].setIntervalID)
                    console.log(Warriors[theVictimTeam][theVictimPlayer].name, " dies")
                    Warriors[theVictimTeam].splice(theVictimPlayer, 1)
                    if(Warriors[theVictimTeam].length === 0) {
                        team.splice(theVictimTeam, 1)
                    }
                }
            }, 1/Warriors[teamNumber][playerNumber].speed*200)
            Warriors[teamNumber][playerNumber].setIntervalID = setIntervalID
        }
    }

}

LetsTheGameBegin()