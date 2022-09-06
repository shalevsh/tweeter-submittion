"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class moduleData {
    constructor() {
        this.users = [];
        this.quote = "";
        this.aboutMe = "";
        this.pokemon = null;
    }
    getRandomUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch('https://randomuser.me/api/?results=5000')
                .then((response) => response.json())
                .then((data) => console.log(data));
        });
    }
}
exports.default = moduleData;
// arr.forEach((p:PersonNameOnly)=>{console.log(p.name)})
// fetch('https://randomuser.me/api/?results=7')
//   .then((response) => response.json())
//   .then((data) => console.log(data));
