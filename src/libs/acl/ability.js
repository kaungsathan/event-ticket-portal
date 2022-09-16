import { Ability } from "@casl/ability"
import { initialAbility } from "./config"
import Cookies from "js-cookie"

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = Cookies.get("userData")
  ? JSON.parse(Cookies.get("userData"))
  : null
const existingAbility = userData ? userData.role.abilities : null

export default new Ability(existingAbility || initialAbility)
