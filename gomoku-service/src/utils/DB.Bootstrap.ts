import 'dotenv/config';
import connect from './DB.Connect';
import userModel from '../model/user.model';
import gameModel from '../model/game.model';
import users from '../data/user.json';
import games from '../data/game.json';

const run = async () => {
    try{
        await connect();
        await userModel.deleteMany();
        await userModel.insertMany(users);
        await gameModel.deleteMany();
        await gameModel.insertMany(games);

        process.exit(0);
    } catch (exception){
        console.log(exception);
        process.exit(1);
    }
}
run();