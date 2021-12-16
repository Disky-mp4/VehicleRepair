function notify(message){ // notify function, creates a little message above the minimap
    BeginTextCommandThefeedPost('STRING');
    AddTextComponentSubstringPlayerName(message);
    EndTextCommandThefeedPostTicker(true, true);
}

emit('chat:addSuggestion', '/repair', 'Restores vehicle to maximum health and perfect condition if close to a mechanic shop.');
emit('chat:addSuggestion', '/fix', 'Restores vehicle to maximum health and perfect condition if close to a mechanic shop.');

const mechanicShopLocations = { // some example locations
    sandygas: {
        x: 2005,
        y: 3798
    },
    flywheels: {
        x: 1767,
        y: 3329
    },
    paletogas: {
        x: 107,
        y: 6624
    }
}

let fixed = false; // initial value, vehicle is/has not been repaired
RegisterCommand('repair', () => {
    fixVehicle();
})

RegisterCommand('fix', () => {
    fixVehicle();
})

function fixVehicle(){
    const ped = GetPlayerPed(-1); // player ped
    const pedL = GetEntityCoords(ped); // ped location
    const veh = GetVehiclePedIsIn(ped); // ped/player vehicle
    if(!veh){return notify('You must be in a vehicle to repair it!')} // make sure they are in a vehicle
    const [playerX, playerY] = [pedL[0], pedL[1]]; // player x & y coord
    Object.values(mechanicShopLocations).forEach(location => { // loop through values of the mechanicShopLocations obj
        if(Math.abs(location.x - playerX) < 15 && Math.abs(location.y - playerY) < 15){ // check if they're within 15 units
            SetVehicleFixed(veh); // fix vehicle
            SetVehicleEngineHealth(veh, 1000); // set engine hp to 1000 (full) in case engine is completely destroyed (wont be fixed by prev. line)
            notify('Vehicle fixed!');
            fixed = true; // vehicle has been repaired
        }
    })
    if(!fixed){ // fixed = false
        notify('Too far away from a mechanic shop to repair!');
    }
    fixed = false; // reset fixed var
}