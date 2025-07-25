//=============================================================================
// Spriter Pro Plugin
// by KanaX
// version 1.4.0
// Last Update: 2018.11.09
//=============================================================================

/*:
 * @plugindesc Allows user to utilize Spriter Pro save files and sprite parts for Skeletal Animations
   <Spriter> v1.3.5
 * @author KanaX
 *
 * 
 * @param Show Skeleton
 * @desc Display the Animation Skeleton (true or false).
 * @type boolean
 * @on Enabled
 * @off Disabled 
 *
 * @param Show Frames
 * @desc Display the Animation Frames (true or false).
 * @type boolean
 * @on Enabled
 * @off Disabled 
 * 
 * @param Evaluate Parameters
 * @desc Use variables in plugin commands by adding "var_" in front of the variable (true or false).
 * @default false
 * @type boolean
 * @on Enabled
 * @off Disabled 
 *
 * @param Log Animations
 * @desc Print all animations in the data/animations folder.
 * @default false
 * @type boolean
 * @on Log
 * @off Do not Log
 *
 * @param TexturePacker Folder Character
 * @desc The characters you use on folders containing TexturePacker spritesheets.
 * @default $
 *
 * @param Limit Frame Counter
 * @desc If Limit Process Check is On, determine in how many frames a Spriter Sprite will be updating.
 * @default 0
 *
 * @param Animations Folder
 * @desc Folder where animations are kept.
 * @default data/animations/
 *
 * @param Spriter Sprites Folder
 * @desc Folder where skinsets and single bitmaps are kept.
 * @default img/characters/
 *
 * @param Actor Parts
 * @desc Actors have changing equipment. This parameters allow for more dynamically changing cosmetic parts like hair, accessories, cloaks etc.
 * @default "{\n\"AccA\": {\"isSkinset\": true, \"name\":\"\", \"isSpriterSprite\": false},\n\"AccB\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"FrontHair\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"RearHair1\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"RearHair2\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"BeastEars\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"Tail\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"Cloaks\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"Ears\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"FacialMark\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false},\n\"Wing\": {\"isSkinset\": true, \"name\": \"\", \"isSpriterSprite\": false}\n}"
 * @type note
 *
 * @param Spriter Objects Common Event ID
 * @desc ID of the Common Event where Spriter Objects data is stores
 * @default 69
 *
 * @help 
 *
 * Contact: 
 * [1] forums.rpgmakerweb.com: KanaX
 *
 * Special Thanks to ivan.popelyshev (https://github.com/pixijs/pixi-display/tree/layers)
 *
 * Terms of Use:
 * [1] Free for use in all projects.
 * [2] Please provide credits to KanaX.
 * [3] Feel free to let me know about your project, or any ideas regarding the plugin.
 *
 * Spriter Pro Plugin Instructions:
 *
 * Installation:
 * [1] Paste js file in js/plugins/
 * [2] Create path img/characters/Spriter/ and inside Spriter, a folder named Single Bitmaps.
 * [3] Create path data/animations/.
 * [4] Enable the plugin from the Plugin Manager.
 * [5] Have some ramen noodles, because you deserve them.
 *
 * Regarding Spriter:
 * [1] The plugin should work as expected in most regards (please check "Future Updates/Fixes" for more information).
 * [2] The first 4 animations in a Spriter project will respond to the character's 4 directions. If you want your character
 *     to move without Direction Fix, you have to create at least 4 animations.
 * [3] While you can change the pivot of your bitmaps when you have inserted them into your project, you must not edit pivot x 
 *     and pivot y in Edit Image's Default Pivot 
 * [4] Spriter might face some problems with its documentation, so if something inexplicably does not work, try redoing the animation.
 *     If that does not fix your problem, feel free to contact the plugin creator.
 *
 * Plugin Operation:
 * [1] Paste Spriter Pro save file in data/animations/. The file name will be the skeleton,
 * [2] Create a folder in img/character/Spriter/, named after the Skinset. The Skinset folder should have 4 folder which each taking the parts for each direction.
 *     Example: Folder_1: [head,torso,r_arm,_r_leg,_l_arm,l_leg], Folder_2: [head,torso,r_arm,_r_leg,_l_arm,l_leg], Folder_3: [head,torso,r_arm,_r_leg,_l_arm,l_leg], Folder_4: [head,torso,r_arm,_r_leg,_l_arm,l_leg] 
 * [3] Inside the Skinset folder, create the folders with the bitmaps you used for the animation.
 *     Note: If you want to use Texture Packer, just place the sprite sheet and json file inside the Skinset folder. Their names should be the same as the Skinset folder.
 * [4] If you want certain Spriter Sprites to appear globally across the game (such as animated armor and weapons for actors) you need to create them in the SpriterObjects.json file in your data folder.
 *     (See more info about SpriterObjects.json in About SpriterObjects.json).
 * [5] To create a Spriter Sprite for actors, go to Tools -> Database and write this on the actors' notes:
 *     <Spriter:{
 *     "_skeleton": The file name of the animation you want to choose from data/animations/,
 *     "_skin": The folder name of the Skinset you want to choose from img/characters/Spriter,
 *     "_speed": Speed of animation,
 *     "_cellX": Width of the area the main animation takes part in (example: the standard MV character cell width is 48),
 *     "_cellY": Height of the area the main animation takes part in (example: the standard MV character cell height is 48),
 *     "_spriterMask": Determine if the sprite will have a mask around it. If true, you need to fill the tags below,
 *     "_spriteMaskX": X value of mask origin. 0, 0 is the top left corner of the cell,
 *     "_spriteMaskY": Y value of mask origin. 0, 0 is the top left corner of the cell,
 *     "_spriteMaskW": Width of the mask,
 *     "_spriteMaskH": Height of the mask
 *
 *     Example:
 *     <Spriter:{
 *     "_skeleton": "f",
 *     "_skin": "Side/f7",
 *     "_speed": 7,
 *     "_cellX": 32,
 *     "_cellY": 48,
 *     "_spriterMask": false
 *     }>  
 *
 * [6] To create a Spriter Sprite for an event create a comment in the active event page:
 *     <Spriter, skeleton, skinset, speed, cellX, cellY, false>
 *     or
 *     <Spriter, skeleton, skinset, speed, cellX, cellY, true, maskX, maskY, maskW, maskH> 
 *  
 *     Example
 *     <Spriter, doggo, sheperd, 10, 48, 32, true, 0, 0, 48, 32>
 *
 * WARNING: 01/24/2018 THERE IS A PIXI.JS BUG IN v4.5.4 THAT MAKES MASKS NOT WORK IF THE MAP HAS TILES. 
 *
 * [7] Animations play when 1) an actor/event has walking animation on and is moving, or 2) an actor/event has stepping animation on.
 *
 * [8] Animations that are supposed to loop (walking animations, rolling balls, etc.) you need to toggle the Repeat Playback button in the Spriter Pro timeline.
 *
 * About Spriter Objects:
 * Much like the MV Sprite_Character class, Spriter_Character class looks for data in the actor/event object in order to create/update a sprite. But what happens 
 * when we want our character to hold an animated sprite? A sprite whose animation is separate from the animation of its parent? Like a torch, or a magic aura. 
 * And what do we do when we want to keep these sprites for multiple maps?
 * That's why we create SpriterObjects!
 * In SpriterObjects we create faux game objects, with just the bare minimum data to satisfy the needs of the Spriter_Character class. You create a new object, 
 * you give it a name, skeleton, skin and then you can attach it to any character you want!
 * These objects are created as comments in the COMMON EVENT with the ID that you assigned on the Spriter Objects Common Event ID:
 *
 * <objectName, skeleton, skin, speed, cellX, cellY>
 *
 * Example: <shiny_axe, shiny_axe, shiny_axe, 7, 48, 48>
 *
 * Plugin Commands:
 * [1] eventSkeleton eventId data/animations/skeleton Spriter/skinsetName                                     (Changes skeleton. Since skeleton changes, skinset needs to change as well.)
 *     Example: eventSkeleton 1 waving_hello male_1
 *
 * [2] eventSkin eventId Spriter/skinsetName                                                                  (Changes Skinset. Needs to be compatible with skeleton.)
 *     Example: eventSkin 1 male_2
 *
 *     Note: Adding a "$" infront of Spriter/skinsetname will load the bitmap
 *           from the respective TexturePacker bitmap, as long as it exists.
 *
 * [3] eventStop eventId true/false                                                                           (Stops Animation.)
 *     Example: eventStop 1 true

 * [4] eventRecovery eventId ("snap"/"freeze")                                                                (Snap resets animation when movement stops. Freeze pauses animation.)
 *     Example: eventRecovery 1 freeze

 * [5] eventSkinPart eventId imageName (Spriter/skinsetName)-or-(bitmap name from Single bitmaps) fullsprite? (Changes only a single image from that skinset to another, compatible one.)
 *                                                                                                            (fullsprite is set to true or false and determines if the new bitmap will be from a full spriteset or not)
 *                                                                                                            (if it is set to true then the user will have to use the desired spriteset path)
 *                                                                                                            (if it is set to false then the user will have to use the desired bitmap path from within the Single Bitmaps folder)
 *     Example1: eventSkinPart 1 hat Items/helmet true                                                        (helmet needs to be a folder with the same filename/location as the one of the previous bitmap)
 *     Example2: eventSkinPart 1 r_hand_weapon mace false 
 *
 *     Note: Adding a "$" infront of Spriter/skinsetname will load the bitmap
 *           from the respective TexturePacker bitmap, as long as it exists.                                                    (mace needs to be a bitmap inside the Single Bitmaps folder)
 *
 * [6] eventRemoveSkinPart eventId imageName                                                                  (Removes Spriter/skinsetName bitmap from imageName)
 *     Example: eventRemoveSkinPart 1 r_hand_weapon 
 *
 * [7] eventChildSprite eventId imageName objectName                                                          (Assigns a sprite from data/SpriterObjects.json to imageName)
 *     Example: eventChildSpriter 1 r_hand_weapon glowing_mace                                                (glowing_mace needs to be an object in SpriterObjects)
 *
 * [8] eventRemoveChildSprite eventId imageName objectName                                                    (Remove sprite object)
 *     Example: eventChildSpriter 1 r_hand_weapon glowing_mace
 *
 * -----------------------------------------------------------------------------
 * [9] playerSkeleton data/animations/skeleton Spriter/skinsetName
 * [10] playerSkin Spriter/skinsetName
 * [11] playerStop true/false
 * [12] playerRecovery ("snap"/"freeze")
 * [13] playerSkinPart imageName Spriter/skinsetName
 * [14] playerRemoveSkinPart imageName 
 * [15] playerChildSprite imageName objectName
 * [16] playerRemoveChildSprite imageName objectName
 * -----------------------------------------------------------------------------
 * [17] followerSkeleton followerId data/animations/skeleton Spriter/skinsetName
 * [18] followerSkin followerId Spriter/skinsetName
 * [19] followerStop followerId true/false
 * [20] followerRecovery followerId ("snap"/"freeze")
 * [21] followerSkinPart  followerId imageName Spriter/skinsetName
 * [22] followerRemoveSkinPart  followerId imageName 
 * [23] followerChildSprite followerId imageName objectName
 * [24] followerRemoveChildSprite followerId imageName objectName
 *
 * Script Calls:
 * [1] $gameMap._events[1].resetAnimation = true;                                                              (Resets animation)
 * [2] $gamePlayer.resetAnimation = true;
 * [3] $gamePlayer.followers()[1].resetAnimation = true;
 * [4] $gameMap._events[1].hasActiveTag("tagName");                                                            (Checks if character has an active tag for this frame)
 * [5] $gameMap._events[1]._spriter.var.variableName;                                                           (Returns value for variableName for this Frame)
 * [6] $gamePlayer.changeSkinPart(parameters same as plugin command);
 * [7] $gamePlayer.removeSkinPart(parameters same as plugin command);
 * [8] $gamePlayer.createChildSprite(parameters same as plugin command);
 * [9] $gamePlayer.removeChildSprite(parameters same as plugin command);
 *
 * Tag Commands:                                                                                               (Place tags with the following labels for special effects)
 * [1] se,seName,pan,pitch,volume,fade(, areaOfMaxVolume, areaOfTotalFade)                                     (Plays SE sound. If fade is true, the sound fades away the further the player is from the source)
 *     Example1: se,step,0,100,60,true,3,10
 *     Example2: se,clock,0,80,100,false
 *
 * [2] SkinPart,imageName,(Spriter/skinsetName)-or-(bitmap name from Single bitmaps),fullsprite?               (Works exactly like the plugin command. Useful for automatically spawning sprites with certain skinParts. Not so useful if those sprites change parts often.)
 *     Example1: SkinPart,hat,stink_lines,false
 *     Example2: SkinPart,torso,Items/tuxedo,true
 *
 * [3] RemoveSkinPart,imageName,(Spriter/skinsetName)-or-(bitmap name from Single bitmaps),fullsprite?
 *     Example: RemoveSkinPart,hat,stink_lines,false
 *
 * [4] ChildSprite,imageName,objectName                                                                        (Works exactly like the plugin command.Useful for automatically spawning sprites with certain childSprites. Not so useful if those sprites change children often.)
 *     Example: ChildSprite,r_hand_tool,twinking_axe
 *
 * [5] RemoveChildSprite,imageName,objectName
 *     Example: ChildSprite,r_hand_tool,twinking_axe
 *
 * ----------------------------------------------------------------------------
 * Revisions
 * 02/22/2018: Updated for MV version 1.6
 * 03/18/2018: Added Bezier Curve Tweening for Animations
 *             Added Instant Tweening for Animations
 *             Added TexturePacker Support.
 *             Added Paramaters to give Spriter Plugin better Performance.
 * 04/30/2018: Fixed saving bug.
 *             Formatted the core classes for future add-ons and updates.
 *             Added ability to tag sprites to be replaced with equiped items.
 * 07/12/2018: Fixed Bug regarding deletion of unused sprite parts.
 * 			   Added game variable control via tags.
 *             Added self switch control via tags.
 *             Added functional update limiter.
 *             
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * Future Updates/Fixes
 *
 * [1] Fix reverse animations (this._speed < 0).
 * [2] Add ability to distort texture meshes.
 * [3] Make functional masks after dealing with a pixi.js bug. 
 *
 * ----------------------------------------------------------------------------
 *
 *
 */

SpriterData.parameters = $plugins.filter(function (p) { return p.description.contains('<Spriter>'); })[0].parameters;
SpriterData.showSkeleton = eval(SpriterData.parameters['Show Skeleton']) || false;
SpriterData.showFrames = eval(SpriterData.parameters['Show Frames']) || false;
SpriterData.evaluateParameters = eval(SpriterData.parameters['Evaluate Parameters']) || false;
SpriterData.logAnimations = eval(SpriterData.parameters['Log Animations']) || false;
SpriterData.texturePackerCharacter = SpriterData.parameters['TexturePacker Folder Character'] || "$";
SpriterData.limitCounter = Number(SpriterData.parameters['Limit Frame Counter']) || 0;
SpriterData.animFolder = SpriterData.parameters['Animations Folder'] || "data/animations/";
SpriterData.spriteFolder = SpriterData.parameters['Spriter Sprite Folder'] || "img/characters/";
SpriterData.actorParts = SpriterData.parameters['Actor Parts'].substring(1, SpriterData.parameters['Actor Parts'].length - 1).replace(/\\n/g, '').replace(/\\/g, '');
SpriterData.sObjectsID = Number(SpriterData.parameters['Spriter Objects Common Event ID']) || 69;
// SpriterData.sAnimationsID = Number(parameters['Spriter img Animations Common Event ID']) || 70;

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Initializes New Parameters for Characters
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

const spriter_alias_Game_CharacterBase_initmembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function () {
    spriter_alias_Game_CharacterBase_initmembers.call(this);
    this._spriter = {};
    this._spriter._skeleton = null;
    this._spriter._skin = null;
    this._spriter._skinParts = [];
    this._spriter._spriteChildren = [];
    this._spriter._speed = 1;
    this._spriter._repeat = false;
    this._spriter._stop = false;
    this._spriter._recovery = "snap";
    this._spriter.tag = [];
    this._spriter.var = {};
    this._spriter._spriteMask = {};
    this._spriter._showSkeleton = false;
    this._spriter._spriteRequests = [];
    this._spriter._spriteRemoveRequests = [];
    this._spriter._scaleX = 1;
    this._spriter._scaleY = 1;
    this._spriter._animLimiter = null;
};

//-------------------------------------------------------------------------------------------------------------
// Give values to properies from meta or stored global values.
//-------------------------------------------------------------------------------------------------------------
Game_CharacterBase.prototype.setAnimationInfo = function (character, list, visible) {
    let notes = {};

    if (character.constructor == Game_Player) {
        notes = $dataActors[$gameParty.leader()._actorId].meta;
    }
    else if (character.constructor == Game_Follower) {
        notes = $dataActors[character.actor()._actorId].meta;
    }
    else if (character.constructor == Game_Event) {
        // Giving the Event comment a similar format to that of Actor meta data
        const comment = list.parameters[0].substring(9, list.parameters[0].length - 1);
        const param = comment.split(",");
        notes.Spriter = '{';
        notes.Spriter += '"_skeleton":' + '"' + param[0] + '"';
        notes.Spriter += ', "_skin":' + '"' + param[1] + '"';
        notes.Spriter += ', "_speed":' + param[2];
        notes.Spriter += ', "_cellX":' + param[3];
        notes.Spriter += ', "_cellY":' + param[4];
        notes.Spriter += ', "_spriteMask":' + '"' + param[5] + '"';
        if (param[5] == 'true') {
            notes.Spriter += ', "_spriteMaskX":' + param[6];
            notes.Spriter += ', "_spriteMaskY":' + param[7];
            notes.Spriter += ', "_spriteMaskW":' + param[8];
            notes.Spriter += ', "_spriteMaskH":' + param[9];
        }
        notes.Spriter += '}';
    }
    // Getting Character Info stored in global variable. It will replace Meta/Comment data if it exists.
    const globalInfo = this.getCharacterGlobal();
    if (notes.Spriter) {
        notes = JSON.parse(notes.Spriter);
        character._spriter._skeleton = visible ? globalInfo._skeleton || notes._skeleton : null;
        character._spriter._skin = visible ? globalInfo._skin || notes._skin : null;
        character._spriter._skinParts = globalInfo._skinParts || [];
        character._spriter._spriteChildren = globalInfo._spriteChildren || [];
        character._spriter._speed = globalInfo._speed || notes._speed;
        character._spriter._cellX = notes._cellX;
        character._spriter._cellY = notes._cellY;
        character._spriter._stop = globalInfo._stop || false;
        character._spriter._spriteMask.available = notes._spriteMask;
        if (character._spriter._spriteMask.available) {
            character._spriter._spriteMask.x = notes._spriteMaskX;
            character._spriter._spriteMask.y = notes._spriteMaskY;
            character._spriter._spriteMask.w = notes._spriteMaskW;
            character._spriter._spriteMask.h = notes._spriteMaskH;
        }
    }
    // Temp animation info for deprecated notes.
    else {
        if (character.actor()) {
            console.log('WARNING: The Spriter Plugin note commands used for actor ' + character.actor()._actorId + ' are deprecated.');
        }
        character._spriter._skeleton = visible ? globalInfo._skeleton || notes._skeleton.trim() : null;
        character._spriter._skin = visible ? globalInfo._skin || notes._skin.trim() : null;
        character._spriter._skinParts = globalInfo._skinParts || [];
        character._spriter._spriteChildren = globalInfo._spriteChildren || [];
        character._spriter._speed = globalInfo._speed || notes._speed.trim();
        character._spriter._cellX = notes._cellX.trim();
        character._spriter._cellY = notes._cellY.trim();
        character._spriter._stop = globalInfo._stop || false;
        character._spriter._spriteMask.available = eval(notes._spriteMask.trim());
        if (character._spriter._spriteMask.available) {
            character._spriter._spriteMask.x = notes._spriteMaskX.trim();
            character._spriter._spriteMask.y = notes._spriteMaskY.trim();
            character._spriter._spriteMask.w = notes._spriteMaskW.trim();
            character._spriter._spriteMask.h = notes._spriteMaskH.trim();
        }
    }
};

Game_CharacterBase.prototype.changeSkinPart = function (originName, newSkin, isSkinset) {
    this._spriter.forceUpdate = true;
    const a = {};
    a.originName = originName;
    a.newSkin = newSkin;
    a.isSkinset = eval(isSkinset);
    if (this._spriter._skinParts.length > 0) {
        for (let i = 0; i < this._spriter._skinParts.length; i++) {
            if (this._spriter._skinParts[i].originName == a.originName) {
                this._spriter._skinParts[i] = a;
                break;
            }
            else if (i == this._spriter._skinParts.length - 1) {
                this._spriter._skinParts.push(a);
            }
        }
    }
    else {
        this._spriter._skinParts.push(a);
    }

    this.removeChildSprite(originName);

    const globalInfo = this.getCharacterGlobal();
    globalInfo._skinParts = this._spriter._skinParts;
};

Game_CharacterBase.prototype.removeSkinPart = function (originName) {
    this._spriter.forceUpdate = true;
    const a = {};
    a.originName = originName;
    for (let i = 0; i < this._spriter._skinParts.length; i++) {
        if (this._spriter._skinParts[i].originName == a.originName) {
            this._spriter._skinParts.splice(i, 1);
            break;
        }
    }

    const globalInfo = this.getCharacterGlobal();
    globalInfo._skinParts = this._spriter._skinParts;
}

Game_CharacterBase.prototype.createChildSprite = function (parentSprite, spriteObjectName) {
    this._spriter.forceUpdate = true;

    const children = this._spriter._spriteChildren;

    // Get object from SpriterObjects.json
    for (let i = 0; i < $dataSpriterObjects.length; i++) {
        if ($dataSpriterObjects[i]._name == spriteObjectName) {
            const content = $dataSpriterObjects[i];
        }
    }

    // Add new SpriterCharacter as child of this character
    children.push(new Game_SpriterCharacter(content, parentSprite, children.length))

    // Make request for Spriteset_Map to make a new Sprite for the Child
    this._spriter._spriteRequests.push(children[children.length - 1]);

    this.removeSkinPart(parentSprite);

    // Save new changes in global variable
    const globalInfo = this.getCharacterGlobal();
    globalInfo._spriteChildren = children;
};

Game_CharacterBase.prototype.removeChildSprite = function (spriteParentName) {
    this._spriter.forceUpdate = true;
    const children = this._spriter._spriteChildren;
    for (let i = 0; i < children.length; i++) {
        if (children[i]._spriteParent == spriteParentName) {
            children.splice(i, 1);
        }
    }

    this._spriter._spriteRemoveRequests.push(spriteParentName);

    const globalInfo = this.getCharacterGlobal();
    globalInfo._spriteChildren = children;
};

Game_CharacterBase.prototype.getCharacterGlobal = function () {
    if (this instanceof Game_Player) {
        return $infoSpriter.player;
    }
    else if (this instanceof Game_Follower) {
        return $infoSpriter.followers["follower_" + this._memberIndex];
    }
    else if (this instanceof Game_Event) {
        this.eventDataExists();
        return $infoSpriter.maps["map_" + $gameMap._mapId]["event_" + this._eventId];
    }
};

// Creates Event Data for unvisited Maps
Game_CharacterBase.prototype.eventDataExists = function () {
    const map = $infoSpriter.maps["map_" + $gameMap._mapId];
    if (!map.hasOwnProperty("event_" + String(this._eventId))) {
        map["event_" + String(this._eventId)] = {};
    }
};

//-------------------------------------------------------------------------------------------------------------
// Check Character for Active Tags
//-------------------------------------------------------------------------------------------------------------
Game_CharacterBase.prototype.hasActiveTag = function (tagName) {
    for (let i = 0; i < this._spriter.tag.length; i++) {
        if (this._spriter.tag[i].name == tagName) {
            return true;
        }
    }
    return false;
};

const spriter_alias_Game_CharacterBase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function () {
    spriter_alias_Game_CharacterBase_update.call(this);
    this.checkTags();
};

Game_CharacterBase.prototype.checkTags = function () {
    if (this.hasOwnProperty("_spriter")) {
        for (let i = 0; i < this._spriter.tag.length; i++) {
            this.checkForSpecialTag(this._spriter.tag[i]);
        }
    }
};

Game_CharacterBase.prototype.checkForSpecialTag = function (tag) {
    console.log(tag.name);
    if (tag.name.includes("se,")) {
        this.playSpriterSE(tag);
    }
    else if (tag.name.includes("g-variable,")) {
        this.changeGameVariable(tag);
    }
    else if (tag.name.includes("s-switch,")) {
        this.changeSelfSwitch(tag);
    }
    else if (tag.name.includes("SkinPart,")) {
        const tagArray = tag.name.split(",");
        this.changeSkinPart(tagArray[1], tagArray[2], tagArray[3]);
    }
    else if (tag.name.includes("script<")) {
        const scriptCall = tag.name.replace("script<", "").replace(">", "");
        console.log(scriptCall);
        eval(scriptCall);
    }
};

Game_CharacterBase.prototype.playSpriterSE = function (tag) {
    const tagArray = tag.name.split(",");
    const params = {};
    params.name = tagArray[1];
    params.pan = tagArray[2];
    params.pitch = tagArray[3];
    params.volume = Number(tagArray[4]);
    if (tagArray[5] === "true") {
        const maxVolumeArea = Number(tagArray[6]);
        const maxArea = Number(tagArray[7]);
        const dx = Math.abs(this.x - $gamePlayer.x);
        const dy = Math.abs(this.y - $gamePlayer.y);
        const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (d > maxVolumeArea && (d - maxVolumeArea) <= maxArea) {
            params.volume -= params.volume * (d - maxVolumeArea) / maxArea;
        }
        else if ((d - maxVolumeArea) > maxArea) {
            params.volume = 0;
        }
    }
    AudioManager.playSe(params);
};

Game_CharacterBase.prototype.changeGameVariable = function (tag) {
    const tagArray = tag.name.split(",");
    var id = eval(tagArray[1]);
    const value = eval(tagArray[2]);
    $gameVariables.setValue(id, value);
};

Game_CharacterBase.prototype.changeSelfSwitch = function (tag) {
    if (this instanceof Game_Event) {
        const tagArray = tag.name.split(",");
        const key = tagArray[1];
        const value = eval(tagArray[2]);
        $gameSelfSwitches.setValue([$gameMap.mapId(), this._eventId, key], value);
    }
};
//-------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------
// Refreshes additional Spriter properties
//-------------------------------------------------------------------------------------------------------------
const spriter_alias_Game_Player_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function () {
    spriter_alias_Game_Player_refresh.call(this);
    const playerNotes = $dataActors[$gameParty.leader()._actorId].meta;
    if (playerNotes.hasOwnProperty("Spriter")) {
        this.setAnimationInfo(this, null, true);
    }
};

const spriter_alias_Game_Follower_refresh = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function () {
    spriter_alias_Game_Follower_refresh.call(this);
    if (this.actor()) {
        const followerNotes = $dataActors[this.actor()._actorId].meta;
        if (followerNotes.hasOwnProperty("Spriter")) {
            this.setAnimationInfo(this, null, this.isVisible());
        }
    }
};

const spriter_alias_Game_Event_refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function () {
    this.checkForNewSpriterSprite();
    spriter_alias_Game_Event_refresh.call(this);

    // Change Animation if the New Page has a Spriter Comment
    const pageSpriterInfo = this.hasSpriterSprite(this._pageIndex);
    if (pageSpriterInfo) {
        this.setAnimationInfo(this, pageSpriterInfo, true);
    }
};

Game_Event.prototype.checkForNewSpriterSprite = function () {
    const newPageIndex = this._erased ? -1 : this.findProperPageIndex();

    // If Event doesn't have a Spriter Sprite and New Page has a Spriter Comment Request new Spriter Sprite
    if (this._pageIndex !== newPageIndex && this.newPageAddsSprite(newPageIndex)) {

        // Adds a request to create Spriter Character for Actor.
        $infoSpriter._eventRequests.push(this._eventId);
    }
}

// Check if Current Page has Spriter Comment
Game_Event.prototype.hasSpriterSprite = function (pageIndex) {
    if (this.event().pages[pageIndex]) {
        const commandList = this.event().pages[pageIndex].list;
        for (let i = 0; i < commandList.length; i++) {
            if (commandList[i].code == 108) {
                if (commandList[i].parameters[0].includes("Spriter")) {
                    return commandList[i];
                    break;
                }
            }
        }
    }
    return false;
};

// If Event doesn't have a Spriter Sprite and New Page has a Spriter Comment
Game_Event.prototype.newPageAddsSprite = function (newPageIndex) {
    const newPage = this.hasSpriterSprite(newPageIndex);
    return this._spriter._skeleton == null && newPage;
};

//-------------------------------------------------------------------------------------------------------------
// When a new Actor is added, they are checked for Spriter Sprite
//-------------------------------------------------------------------------------------------------------------
const spriter_alias_Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function (actorId) {
    spriter_alias_Game_Party_addActor.call(this, actorId);
    if (this._actors.contains(actorId)) {

        // Adds a request to create Spriter Character for Actor.
        $infoSpriter._followerRequests.push(actorId);
    }
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Game Actor is used for data that is needed both in Scene_Map and Scene_Battle
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

const spriter_alias_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function () {
    spriter_alias_Game_Actor_initMembers.call(this);
    this._apparel = {};
};

const spriter_alias_Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    spriter_alias_Game_Actor_setup.call(this, actorId);
    this._apparel = JSON.parse(SpriterData.actorParts);
};

Game_Actor.prototype.changeApparel = function (apparelType, apparelName, isSkinset, isSpriterSprite) {
    const newApparel = { name: apparelName, isSkinset: (isSkinset != "undefined" ? isSkinset : true), isSpriterSprite: (isSpriterSprite != "undefined" ? isSpriterSprite : false) };
    this._apparel[apparelType] = newApparel;
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Creates and Updates Sprite Characters from New Spriter Class
//*************************************************************************************************************
// Word "Spriter" is searched for in meta, event comments and SpriterObjects.json
//-------------------------------------------------------------------------------------------------------------

const spriter_alias_Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function () {
    spriter_alias_Spriteset_Map_createCharacters.call(this);
    this.createSpriterCharacters();
};

Spriteset_Map.prototype.createSpriterCharacters = function () {
    this._spriterCharacterSprites = [];

    // Creating Spriter Event
    $gameMap.events().forEach(function (event) {
        if (this.hasSpriterSprite(event)) {
            this._spriterCharacterSprites.push(new Spriter_Character(event));
        }
    }, this);

    // Creating Spriter Player
    const playerNotes = $dataActors[$gameParty.leader()._actorId].meta;
    if (playerNotes.hasOwnProperty("Spriter")) {
        this._spriterCharacterSprites.push(new Spriter_Character($gamePlayer));
    }

    // Creating Spriter Followers
    $gamePlayer.followers().reverseEach(function (follower) {
        if (follower.actor() && this.hasSpriterSprite(follower)) {
            this._spriterCharacterSprites.push(new Spriter_Character(follower));
        }
    }, this);

    for (let j = 0; j < this._spriterCharacterSprites.length; j++) {
        this._tilemap.addChild(this._spriterCharacterSprites[j]);
    }
};

const spriter_alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function () {
    spriter_alias_Spriteset_Map_update.call(this);
    if ($infoSpriter) {
        this.updateFollowers();
        this.updateEvents();
    }
};

// Checks for requests to add Spriter Character
Spriteset_Map.prototype.updateFollowers = function () {
    const followerRequests = $infoSpriter._followerRequests;
    for (let i = 0; i < followerRequests.length; i++) {
        const followerId = followerRequests[i];
        const followerNotes = $dataActors[followerId].meta;
        if (followerNotes.hasOwnProperty("Spriter")) {
            for (let j = 0; j < $gamePlayer.followers()._data.length; j++) {
                const follower = $gamePlayer.followers()._data[j];
                if (follower.actor() && follower.actor()._actorId == followerId) {
                    this._spriterCharacterSprites.push(new Spriter_Character(follower));
                    const index = this._spriterCharacterSprites.length - 1;
                    this._tilemap.addChild(this._spriterCharacterSprites[index]);
                    $infoSpriter._followerRequests = [];
                }
            }
        }
    }
};

Spriteset_Map.prototype.updateEvents = function () {
    const eventRequests = $infoSpriter._eventRequests;
    for (let i = 0; i < eventRequests.length; i++) {
        const eventId = eventRequests[i];
        const event = $gameMap._events[eventId];
        this._spriterCharacterSprites.push(new Spriter_Character(event));
        const index = this._spriterCharacterSprites.length - 1;
        this._tilemap.addChild(this._spriterCharacterSprites[index]);
        $infoSpriter._eventRequests = [];
    }
};

//-------------------------------------------------------------------------------------------------------------
// Checks Character For Spriter Comment/Note 
//-------------------------------------------------------------------------------------------------------------
Spriteset_Map.prototype.hasSpriterSprite = function (character) {
    if (character.constructor === Game_Event) {
        if (character._pageIndex !== -1) {
            const commandList = character.page(character._pageIndex).list;
            for (let i = 0; i < commandList.length; i++) {
                if (commandList[i].code == 108) {
                    if (commandList[i].parameters[0].substring(1, 8) == "Spriter") {
                        return true;
                    }
                }
            }
        }
    }
    else if (character.constructor === Game_Follower) {
        const followerId = character.actor()._actorId;
        const followerNotes = $dataActors[followerId].meta;
        if (followerNotes.hasOwnProperty("Spriter")) {
            return true;
        }
    }
    return false;
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Spriter_Base
//*************************************************************************************************************
// Superclass for Spriter_Character and Spriter_Battler.
// Deals with the core functions of the Character/Actor animation.
//-------------------------------------------------------------------------------------------------------------

function Spriter_Base() {
    this.initialize.apply(this, arguments);
}

Spriter_Base.prototype = Object.create(Sprite_Base.prototype);
Spriter_Base.prototype.constructor = Spriter_Base;

//-------------------------------------------------------------------------------------------------------------
// Initializing Sprite
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.initialize = function (character) {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
    this.setCharacter(character);
    this.getAnimation(this._skeleton);
    this.initSprite();
    this.displaceSprite();
};

Spriter_Base.prototype.initMembers = function () {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._character = null;
    this._animationId = 0;
    this._animation = null;
    this._pathMain = null;
    this._pathTime = null;
    this._animationFrame = 0;
    this._key = 0;
    this._sprite = null;
    this._skin = null;
    this._skinParts = [];
    this._childrenSprites = [];
    this._skeleton = null;
    this._speed = 1;
    this._cellX = null;
    this._cellY = null;
    this._spriteMaskX = null;
    this._spriteMaskY = null;
    this._repeat = false;
    this._spriteMask = {};
    this._spriteType = '';
    this._animLimiter = null;
    this._metaKeyArray = [];
};

Spriter_Base.prototype.setCharacter = function (character) {

    //Getting Character Meta
    this._character = character;
    this._spriteType = this._character instanceof Game_CharacterBase ? 'character' : 'object';
    this._skeleton = this._character._spriter._skeleton;
    this._skin = this._character._spriter._skin;
    this._skinParts = this._character._spriter._skinParts;
    this._cellX = Number(this._character._spriter._cellX);
    this._cellY = Number(this._character._spriter._cellY);
    this._speed = Number(this._character._spriter._speed);
    this._stop = this._character._spriter._stop;
    this._waitCounter = this._character._spriter._animLimiter !== null ? this._character._spriter._animLimiter : SpriterData.limitCounter;
    this._animLimiter = this._character._spriter._animLimiter !== null ? this._character._spriter._animLimiter : SpriterData.limitCounter;

    if (this._character._spriter._spriteMask) {
        this._spriteMask.available = this._character._spriter._spriteMask.available;
    }
    if (this._spriteMask.available) {
        this._spriteMask.x = Number(this._character._spriter._spriteMask.x);
        this._spriteMask.y = Number(this._character._spriter._spriteMask.y);
        this._spriteMask.w = Number(this._character._spriter._spriteMask.w);
        this._spriteMask.h = Number(this._character._spriter._spriteMask.h);
    }
};

//-------------------------------------------------------------------------------------------------------------
// Get animation from $spriterAnimations
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.getAnimation = function (name) {
    const property = name + ".scml";
    this._animation = $spriterAnimations[property];
};

//-------------------------------------------------------------------------------------------------------------
// Set sprite's objects, bones and layers
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.initSprite = function () {
    this._pathTime = this._animation.entity.animation[this._animationId].timeline;
    this._sprite = new Sprite();
    this._group = new PIXI.display.Group(0, true);
    this._layer = new PIXI.display.Layer(this._group);
    this.addChild(this._sprite);
    this._sprite.addChild(this._layer);
    this._layer.group.enableSort = true;
    this._element = [];
    this._animLength = Number(this._animation.entity.animation[this._animationId].length);
    this._repeat = this._animation.entity.animation[this._animationId].looping || "true";
    this._repeat = eval(this._repeat);

    // Creating All Objects and Bones in the Timeline
    for (let i = 0; i < this._pathTime.length; i++) {
        if (this._pathTime[i].object_type == "bone") {
            this._element[i] = new Sprite();
            this._element[i].parent = null;
        }
        else {
            this._element[i] = new PIXI.Sprite();
            this._element[i].parent = null;
            this._element[i].removeChildren();
            this._element[i].parentGroup = this._group;
        }
    }

    // Info Sprite
    this._infoDisplaySprite = new Sprite();
    this.addChild(this._infoDisplaySprite);
    const bitmapH = this._cellY;
    this._infoDisplaySprite.bitmap = new Bitmap(200, bitmapH);
    this._infoDisplaySprite.bitmap.fontSize = 10;
    this._infoDisplaySprite.y = - bitmapH - 35;
    this._infoDisplaySprite.x = -25;

    // Sprite Mask
    if (this._spriteMask.available) {
        const x = this._spriteMask.x;
        const y = this._spriteMask.y;
        const w = this._spriteMask.w;
        const h = this._spriteMask.h;
        const myMask = new PIXI.Graphics();
        myMask.beginFill();
        myMask.drawRect(-this._cellX / 2 + 2 + x, -this._cellY + 2 + y, w + 2, h + 2);
        myMask.endFill();
        this.addChild(myMask);
        this.mask = myMask;
    }
};

//-------------------------------------------------------------------------------------------------------------
// Moves Sprite from 0,0 point to -width/2,-height point. 
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.displaceSprite = function () {
    this._sprite.x = -this._cellX / 2;
    this._sprite.y = -this._cellY;
};



//-------------------------------------------------------------------------------------------------------------
// Updating Sprite
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.update = function () {
    if (this._waitCounter == this._animLimiter) {
        Sprite_Base.prototype.update.call(this);
        this.checkCharacterState();
        this.updateSprite();
        this._waitCounter = 0;
    }
    else {
        this._waitCounter++;
    }

};

Spriter_Base.prototype.checkCharacterState = function () {
    if (this.characterIsErased()) {
        this.parent.removeChild(this);
        delete this;
    }
};

Spriter_Base.prototype.characterIsErased = function () {
    const character = this._character;
    if (character instanceof Game_Event && character._erased) {
        return true;
    }
    else if (character instanceof Game_Follower && !character.actor()) {
        return true;
    }
    return false;
};

Spriter_Base.prototype.updateDisplay = function () {
    if (SpriterData.showFrames) {
        this._infoDisplaySprite.bitmap.clear();
        this._infoDisplaySprite.bitmap.drawText("key: " + this._key, 0, 10, 100, 1, 'left');
        this._infoDisplaySprite.bitmap.drawText("frame: " + String(Math.round(this._animationFrame)), 0, 25, 100, 1, 'left');
    }
};

Spriter_Base.prototype.resetSpriterSprite = function () {
    this._character._spriter.forceUpdate = true;
    this._character._spriter.tag = [];
    this._character._spriter.var = {};
    this._animationFrame = 0;
    this._key = 0;
    this._waitCounter = this._animLimiter;
    this.refreshSpriterSprite();
};

Spriter_Base.prototype.refreshSpriterSprite = function () {
    this.removeChildren();
    this.getAnimation(this._skeleton);
    delete this._sprite;
    delete this._layer;
    delete this._group;
    this.initSprite();
    this.start();
    this.displaceSprite();
    this._animLength = Number(this._animation.entity.animation[this._animationId].length);
    this._repeat = this._animation.entity.animation[this._animationId].looping || "true";
    this._repeat = eval(this._repeat);
    this.updateDisplay();
};

Spriter_Base.prototype.start = function () {
    this.getSpriteMetaKeyArray();
};

Spriter_Base.prototype.getSpriteMetaKeyArray = function () {
    let map;
    let id;
    let event;
    if (this._animation.entity.animation[this._animationId].hasOwnProperty('meta')) {

        // Update Vars
        if (this._animation.entity.animation[this._animationId].meta.hasOwnProperty('varline')) {
            const varline = this._animation.entity.animation[this._animationId].meta.varline;

            // List of Vars
            for (let i = 0; i < varline.length; i++) {

                // List of Var Keys
                for (let j = 0; j < varline[i].key.length; j++) {
                    const time = Number(varline[i].key[j].time);

                    // Check if metaKeyArray is empty
                    if (this._metaKeyArray.length == 0) {
                        this._metaKeyArray.push(time);
                    }
                    else {

                        // Check if time exists in metKeyArray
                        for (let k = 0; k < this._metaKeyArray.length; k++) {
                            if (this._metaKeyArray[k] == time) {
                                this._metaKeyArray[k] = time;
                                break;
                            }
                            else if (k == this._metaKeyArray.length - 1) {
                                this._metaKeyArray.push(time);
                            }
                        }
                    }
                }
            }
        }

        // Update Tags
        if (this._animation.entity.animation[this._animationId].meta.hasOwnProperty('tagline')) {
            const tagline = this._animation.entity.animation[this._animationId].meta.tagline;
            for (let i = 0; i < tagline.key.length; i++) {
                const time = Number(tagline.key[i].time);

                // Check if metaKeyArray is empty
                if (this._metaKeyArray.length == 0) {
                    this._metaKeyArray.push(time);
                }
                else {

                    // Check if time exists in metKeyArray
                    for (let i = 0; i < this._metaKeyArray.length; i++) {
                        if (this._metaKeyArray[i] == time) {
                            this._metaKeyArray[i] = time;
                            break;
                        }
                        else if (i == this._metaKeyArray.length - 1) {
                            this._metaKeyArray.push(time);
                        }
                    }
                }
            }
        }
    }
};

//-------------------------------------------------------------------------------------------------------------
// Change animation according to character direction and reser sprite
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.updateDirection = function () {
    if ((this._character._direction - 2) / 2 != this._animationId && !this._stop) {
        this._animationId = (this._character._direction - 2) / 2;
        this.resetSpriterSprite();
    }

};


//-------------------------------------------------------------------------------------------------------------
// Check elements of Sprite that should be updated according to the character's condition
//------------------------------------------------------------------------------------------------------------- 
Spriter_Base.prototype.updateSprite = function () {
    if (!this._stop) {
        this.checkChanges();
        this.setCharacterSprite();
        this.updateTagsAndVars();
        if (this.isItemMoving()) {
            this._resetter = false;
            this.updateFrame();
        }

        // Snap Recovery resets animation when movement stops.
        else if (this._recovery == "snap") {

            // Character movement stops after the completion of a step
            // this._resetter resets the animation if !this._character.isItemMoving() for more that one update loop.
            if (this._resetter) {
                this._key = 0;
                this._animationFrame = 0;
                this.updateDisplay();
            }
            else {
                this._resetter = true;
            }
        }
    }
    else {
        this.checkChanges();
    }
    this.checkReset();
};

Spriter_Base.prototype.checkReset = function () {
    if (this._character.resetAnimation) {
        this.resetSpriterSprite();
        this._character.resetAnimation = false;
    }
};

Spriter_Base.prototype.isItemMoving = function () {
    if (this instanceof Spriter_Character) {
        return this._character._stepAnime || this._character.isMoving() && this._character._walkAnime;
    }
    else {
        return true;
    }
};

Spriter_Base.prototype.checkChanges = function () {

    if (this._skeleton !== this._character._spriter._skeleton) {

        // Resetting the whole Sprite
        this._skeleton = this._character._spriter._skeleton;
        this._skin = this._character._spriter._skin;
        this.resetSpriterSprite();
    }
    if (this._skin !== this._character._spriter._skin) {
        this._skin = this._character._spriter._skin;
    }
    if (this._skinParts !== this._character._spriter._skinParts) {
        this._skinParts = this._character._spriter._skinParts;
        this.refreshSpriterSprite();
    }
    if (this._cellX !== this._character._spriter._cellX) {
        this._cellX = Number(this._character._spriter._cellX);
        this.displaceSprite();
    }
    if (this._cellY !== this._character._spriter._cellY) {
        this._cellY = Number(this._character._spriter._cellY);
        this.displaceSprite();
    }
    if (this._speed !== Number(this._character._spriter._speed)) {
        this.fixKeys();
        this._speed = Number(this._character._spriter._speed);
        this.updateFrame();
    }
    if (this._recovery !== this._character._spriter._recovery) {
        this._recovery = this._character._spriter._recovery;
    }
    if (this._stop !== this._character._spriter._stop) {
        this._stop = this._character._spriter._stop;
    }
    if (this.scale.x !== this._character._spriter._scaleX) {
        this.scale.x = this._character._spriter._scaleX;
    }
    if (this.scale.y !== this._character._spriter._scaleY) {
        this.scale.y = this._character._spriter._scaleY;
    }
    if (this._character._spriter._animLimiter && this._animLimiter !== this._character._spriter._animLimiter) {
        this._animLimiter = this._character._spriter._animLimiter;
        this._waitCounter = this._animLimiter;
    }
};

//-------------------------------------------------------------------------------------------------------------
// When this._speed changes sign, this._key is changed.
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.fixKeys = function () {
    if (this._speed < 0 && Number(this._character._spriter._speed) > 0) {
        if (this._key === 0 && this._repeat) {
            this._key = this._pathMain.length - 1;
        }
        else if (this._key === 0 && !this._repeat) {
        }
        else {
            this._key--;
        }
    }
    else if (this._speed > 0 && Number(this._character._spriter._speed) < 0) {
        if (this._key == this._pathMain.length - 1 && this._repeat) {
            this._key = 0;
        }
        else if (this._key == this._pathMain.length - 1 && !this._repeat) {
        }
        else {
            this._key++;
        }
    }
};

//-------------------------------------------------------------------------------------------------------------
// Updates frame. If mid key the frame increases by this._speed. If at key, the frame takes the key time.
// If animation is over, frame does not change or it resets to 0 according to this._repeat.
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.updateFrame = function () {
    this._pathMain = this._animation.entity.animation[this._animationId].mainline.key;
    const speed = this._speed * (this._animLimiter + 1);
    let nextKeyTime;
    const lastKeyTime = Number(this._pathMain[this._pathMain.length - 1].time);

    // Animation Going Forwards
    if (speed > 0) {

        // Works Until Last Key
        if (this._key < this._pathMain.length - 1) {

            nextKeyTime = Number(this._pathMain[this._key + 1].time) || 0;

            // If animationFrame is bigger than next Key Time, then  animationFrame = next Key Time
            if (this._animationFrame + speed >= nextKeyTime) {
                this._key++;
                this._animationFrame = nextKeyTime;
            }
            else {
                this._animationFrame += speed;
            }
        }

        // Works For Last Key
        else if (this._key == this._pathMain.length - 1) {

            // If animationFrame is bigger than Animation Length, animationFrame and key are reset.
            if (this._animationFrame == this._animLength && this._repeat) {
                this._animationFrame = 0;
                this._key = 0;
            }

            // If animationFrame is bigger than Animation Length, then  animationFrame = Animation Length
            else if (this._animationFrame + speed >= this._animLength) {
                this._animationFrame = this._animLength;
                this._key = this._pathMain.length - 1;
            }
            else {
                this._animationFrame += speed;
            }

        }
    }
    this.updateDisplay();
};

//-------------------------------------------------------------------------------------------------------------
// Update Bone and Object x/y/angle/opacity/scale/anchor/inheritance
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.setCharacterSprite = function () {
    this._pathMain = this._animation.entity.animation[this._animationId].mainline.key;
    this._pathTime = this._animation.entity.animation[this._animationId].timeline;

    // Reset Element Usability. Unused Elements for this Run will be cleared on refreshSprite.
    for (let i = 0; i < this._element.length; i++) {
        this._element[i].usedForKey = false;
    }

    // Set Bones
    if (this._pathMain[this._key].hasOwnProperty('bone_ref')) {

        //Going through all Bones for Current Key
        for (let j = 0; j < this._pathMain[this._key].bone_ref.length; j++) {
            const item = this.getItemForTime("bone", j);

            //Setting Bone Inheritance
            this.updateBoneInheritance(j);

            //Setting Bone Values
            this.setUpdateType(item);
        }
    }
    // Set Object 
    if (this._pathMain[this._key].hasOwnProperty('object_ref')) {

        //Going through all Objects for Current Key
        for (let l = 0; l < this._pathMain[this._key].object_ref.length; l++) {

            const item = this.getItemForTime("object", l);

            //Setting Object Inheritance
            this.objectInheritanceUpdate(l);

            //Setting Object Values
            this.setUpdateType(item);
        }
    }

    if (this._character._spriter.forceUpdate) {
        this._character._spriter.forceUpdate = false;
    }

    this.refreshSprite();
};

// Clears items which are not used for current Key
Spriter_Base.prototype.refreshSprite = function () {
    const currentKeyTime = Number(this._pathMain[this._key].time) || 0;
    if (this._speed > 0 && this._animationFrame == currentKeyTime) {
        for (let i = 0; i < this._element.length; i++) {
            if (!this._element[i].usedForKey) {
                this._element[i].texture = PIXI.Texture.EMPTY;
            }
        }
    }
};

// Determines if animation frame is in item's Key, or between Keys. 
Spriter_Base.prototype.setUpdateType = function (item) {

    if (this._animationFrame == item.currentKeyTime) {
        this.setOnKey(item);
    }
    else if (!this._repeat && this._animationFrame > item.lastKeyTime && this.isAnimated(item)) {
        this.setOnKey(item);
    }
    else if (!this.isAnimated(item)) {
        this.setOnKey(item);
    }
    else if (this.isBetweenKeys(item) && this.isItemMoving(this._character) && this.isAnimated(item)) {
        this.tween(item);
    }
};

// Returns Id of item from Timeline. Timeline Id is static and can be used for this._element
Spriter_Base.prototype.pathTimeId = function (type, i) {
    return Number(this._pathMain[this._key][type + "_ref"][i].timeline);
};

// Assigns type, times, and other properties to item.
Spriter_Base.prototype.getItemForTime = function (type, i) {
    let item;
    let item_ref;
    id = this.pathTimeId(type, i);
    if (type == "bone") {
        item = this._element[id];
        item_ref = this._pathMain[this._key].bone_ref[i];
        item.type = "bone";
    }
    else {
        item = this._element[id];
        item_ref = this._pathMain[this._key].object_ref[i];
        item.type = "object";
    }
    item.timelineId = Number(item_ref.timeline); //Id of bone in the Timeline

    item.key = Number(item_ref.key); // Id of bone key for this._key

    item.currentKey = this._pathTime[item.timelineId].key[item.key];
    item.currentKeyTime = Number(item.currentKey.time) || 0;

    item.lastKey = this._pathTime[item.timelineId].key[this._pathTime[item.timelineId].key.length - 1];
    item.lastKeyTime = Number(item.lastKey.time) || 0;

    if (this.isAnimated(item)) {
        item.firstKey = this._pathTime[item.timelineId].key[1];
        item.firstKeyTime = Number(this._pathTime[item.timelineId].key[1].time);
    }
    else {
        item.firstKey = this._pathTime[item.timelineId].key[0];
        item.firstKeyTime = Number(this._pathTime[item.timelineId].key[0].time) || 0;
    }

    item.nextKey = this._pathTime[item.timelineId].key[this.getNextKey(item)];
    item.nextKeyTime = Number(item.nextKey.time) || 0;

    this.updateItemTagsAndVars(item);

    //TBA
    // Check Tags for Sprite Changes ---------------------
    //this.checkForSpecialItemTag(item);
    // ---------------------------------------------------

    // True since this Item exists for the span of the current Key
    item.usedForKey = true;

    return item;
};

Spriter_Base.prototype.updateItemTagsAndVars = function (item) {
    if (!item.vars) {
        item.vars = {};
    }
    if (!item.tags) {
        item.tags = [];
    }
    if (this._pathTime[item.timelineId].hasOwnProperty('meta')) {
        const meta = this._pathTime[item.timelineId].meta;
        if (meta.hasOwnProperty('tagline')) {

            for (let i = 0; i < meta.tagline.key.length; i++) {
                const tagKey = meta.tagline.key[i];
                const tagTime = Number(tagKey.time) || 0;
                if (this.tagsAndVarsCurrentKey(item, tagTime)) {
                    item.tags = [];
                    for (let j = 0; j < tagKey.tag.length; j++) {
                        const tagId = Number(tagKey.tag[j].t);
                        const tagName = this._animation.tag_list.i[tagId].name;
                        item.tags.push(tagName);
                    }
                }
            }
        }
        else if (meta.hasOwnProperty('varline')) {
            for (let i = 0; i < meta.varline.key.length; i++) {
                for (let j = 0; j < varKey.var.length; j++) {
                    const varId = Number(varKey.var[j].def);
                    const variable = this._animation.obj_info[item.obj].var_defs.i[varId];
                    for (let k = 0; k < varKey.var[j].key.length; k++) {
                        var varKey = meta.varline.key[j].key[k];
                        const varTime = Number(varKey.time) || 0;
                        if (this.tagsAndVarsCurrentKey(item, varTime)) {
                            if (variable.type == 'int') {
                                item.vars[variable.name] = Number(varKey.val);
                            }
                            else if (variable.type == 'float') {
                                item.vars[variable.name] = Number(varKey.val);
                            }
                            else if (variable.type == 'string') {
                                item.vars[variable.name] = varKey.val;
                            }
                        }
                        else {
                            if (variable.type == 'int') {
                                item.vars[variable.name] = Number(variable.default);
                            }
                            else if (variable.type == 'float') {
                                item.vars[variable.name] = Number(variable.default);
                            }
                            else if (variable.type == 'string') {
                                item.vars[variable.name] = variable.default;
                            }
                        }
                    }
                }
            }
        }
    }
};

Spriter_Base.prototype.tagsAndVarsCurrentKey = function (item, tagTime) {

    if (!this.isAnimated(item) && tagTime >= this._animationFrame) {
        return true;
    }
    else if (tagTime == this._animationFrame) {
        return true;
    }
    else if (this.isBetweenKeys(item)) {
        return true;
    }
    else if (this._animationFrame == this._animLength) {
        return true;
    }
    return false;
};

// Determines Next Key according to this._speed sign
Spriter_Base.prototype.getNextKey = function (item) {
    if (this._speed > 0) {
        if (item.currentKeyTime == item.lastKeyTime && this._repeat) {
            return 0;
        }
        else if (item.currentKeyTime == item.lastKeyTime && !this._repeat) {
            return item.key;
        }
        else {
            return item.key + 1;
        }
    }
    else {
        if (item.currentKeyTime === 0 && this._repeat) {
            return this._pathTime[item.timelineId].key.length - 1;
        }
        else if (item.currentKeyTime === 0 && !this._repeat) {
            return item.key;
        }
        else {
            return item.key - 1;
        }
    }

};

// Checks if item has more than one Key (has change in values, ergo, animation)
Spriter_Base.prototype.isAnimated = function (item) {
    return this._pathTime[id].key.length > 1;
};


Spriter_Base.prototype.isBetweenKeys = function (item) {
    if (this._speed > 0) {
        if (this._animationFrame < item.lastKeyTime) {
            return this._animationFrame > item.currentKeyTime && this._animationFrame < item.nextKeyTime;
        }
        else {
            return this._animationFrame > item.lastKeyTime;
        }
    }
    else {
        if (this._animationFrame > item.lastKeyTime) {
            return true;
        }
        else if (this._animationFrame < item.lastKeyTime) {
            return this._animationFrame < item.currentKeyTime && this._animationFrame > item.nextKeyTime;
        }
        else {
            return item.lastKeyTime !== 0;
        }
    }
};

//-------------------------------------------------------------------------------------------------------------
// Updates item according to key info.
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.setOnKey = function (item) {
    const element = item.type === "object" ? item.currentKey.object : item.currentKey.bone;

    // General Values ------------------------------------

    // Getting item Values for Key
    const x = Number(element.x) || 0;
    const y = Number(element.y) || 0;
    const r = Number(element.angle) || 0;
    const sx = Number(element.scale_x) || 1;
    const sy = Number(element.scale_y) || 1;

    // Setting item Values for Key
    item.x = x;
    item.y = -y;
    item.rotation = ((-r) * Math.PI / 180);
    item.scale.x = sx;
    item.scale.y = sy;

    // Object-specific Values ----------------------------
    if (item.type === "object") {

        // Getting Object Values for Key
        const folderId = Number(element.folder);
        const fileId = Number(element.file);
        const w = Number(this._animation.folder[folderId].file[fileId].width);
        const h = Number(this._animation.folder[folderId].file[fileId].height);
        const ax = Number(element.pivot_x) || 0;
        const ay = 1 - Number(element.pivot_y) || 0;
        const a = Number(element.a) || 1;

        // Setting Object Values for Key
        item.alpha = a;
        item.anchor.x = ax;
        item.anchor.y = ay;

        if (!this.updateChildSprites(item, w, h)) {
            this.updateTexture(item);
        }
    }
    // Set Texture for Sprite ----------------------------
    else {
        this.updateTexture(item);
    }
    // ---------------------------------------------------
};

// TBA
Spriter_Base.prototype.checkForSpecialItemTag = function (item) {
    if (item.tags) {
        for (let i = 0; i < item.tags.length; i++) {
        }
    }
};

// Assigns the correct image for object / draws bitmap for bone.
Spriter_Base.prototype.updateTexture = function (item) {

    // Object Bitmaps / Character Parts
    if (item.type === "object") {
        this.updateObjectTexture(item);
    }

    // Bone Bitmaps / Skeleton Display
    else {
        this.updateBoneBitmap(item);
    }
};

Spriter_Base.prototype.updateObjectTexture = function (item) {

    // Determine if the texture is from Note Data or Actor equipment
    const tagForEquipment = this.getForEquipment(item);
    const tagForApparel = this.getForApparel(item);
    let i;
    if (tagForApparel && this.characterIsActor()) {
        i = this.loadFromApparell(item, tagForApparel);
    }
    else if (tagForEquipment && this.characterIsActor()) {
        i = this.loadFromEquipment(item, tagForEquipment);
    }
    else {
        i = this.loadFromNotes(item);
    }
    return i;
};

Spriter_Base.prototype.getForEquipment = function (item) {
    if (item.tags) {
        for (let i = 0; i < item.tags.length; i++) {
            if (item.tags[i].contains("Equip ")) {
                return item.tags[i];
            }
        }
    }
    return false;
};

Spriter_Base.prototype.getForApparel = function (item) {
    if (item.tags) {
        for (let i = 0; i < item.tags.length; i++) {
            if (item.tags[i].contains("Apparel ")) {
                return item.tags[i];
            }
        }
    }
}

Spriter_Base.prototype.characterIsActor = function () {
    if (this._character instanceof Game_Player) {
        return true;
    }
    else if (this._character instanceof Game_Follower && this._character.actor()) {
        return true;
    }
    else if (this._character instanceof Game_Actor) {
        return true;
    }
    else {
        return false;
    }
};

Spriter_Base.prototype.loadFromNotes = function (item) {
    const object = item.currentKey.object;
    const folderId = Number(object.folder);
    const fileId = Number(object.file);
    const timelineName = this._pathTime[item.timelineId].name.replace(/\_(\d){3}/, '');
    let filePath = this._animation.folder[folderId].file[fileId].name.replace(/\_(\d){3}/, '');
    let skin = this._skin;
    const skinParts = this._skinParts;
    let path = "Spriter/" + skin + "/" + filePath;
    const i = {};

    // Check for Skin Parts

    for (let j = 0; j < skinParts.length; j++) {
        if (skinParts[j].originName == timelineName) {

            // If Sprite Change is a Full Sprite, then redirect to another Skinset
            if (skinParts[j].isSkinset) {
                skin = skinParts[j].newSkin;
                path = "Spriter/" + skinParts[j].newSkin + "/" + filePath;
            }

            // If not, then replace with an imagee from Single Bitmaps
            else {
                skin = "Single Bitmaps";
                path = "Spriter/Single Bitmaps/" + skinParts[j].newSkin + '.png';
                filePath = skinParts[j].newSkin + ".png";
            }
            break;
        }
    }

    i.path = path.toLowerCase();
    i.skin = skin;
    i.filePath = filePath;

    return i;
};

Spriter_Base.prototype.loadFromEquipment = function (item, tag) {
    const object = item.currentKey.object;
    const folderId = Number(object.folder);
    const fileId = Number(object.file);
    const timelineName = this._pathTime[item.timelineId].name.replace(/\_(\d){3}/, '');
    let filePath = this._animation.folder[folderId].file[fileId].name.replace(/\_(\d){3}/, '');
    const i = {};

    // Determine The Equipment Item and its Notes
    const actor = this.getActor();
    const tagArray = tag.split(' ');
    const equipment = this.getEquipment(tagArray[1], actor);

    // If Equipement Type Empty, Return Empty Object
    const noteObject = this.equipmentHasNote(equipment);
    let notes;

    if (noteObject) {
        notes = JSON.parse(noteObject);
    }
    else {
        return false;
    }


    // Check if Skinset or single Bitmap
    const name = notes.name || equipment.name; // In case many armors share same skin
    const folder = notes.folder || '';
    const isSkinset = eval(notes.isSkinset) || false;
    let skin;
    let path;
    if (isSkinset) {
        skin = folder + "/" + filePath;
        path = "Spriter/" + skin;
    }
    else {
        skin = folder.substring(1, folder.length - 1);
        filePath = name + ".png";
        path = "Spriter/" + folder + "/" + filePath;
    }

    i.path = path.toLowerCase();
    i.skin = folder;
    i.filePath = filePath;

    return i;
};

Spriter_Base.prototype.loadFromApparell = function (item, tag) {
    const object = item.currentKey.object;
    const folderId = Number(object.folder);
    const fileId = Number(object.file);
    const timelineName = this._pathTime[item.timelineId].name.replace(/\_(\d){3}/, '');
    let filePath = this._animation.folder[folderId].file[fileId].name.replace(/\_(\d){3}/, '');
    const filePathArray = filePath.split('/');
    let fileName = filePathArray[filePathArray.length - 1];
    const fileDirection = filePathArray[0];
    const i = {};

    // Determine The Equipment Item and its Notes
    const actor = this.getActor();
    const tagArray = tag.split(' ');
    const bodyItem = this.getApparel(tagArray[1], actor);


    // If Equipment Type Empty, Return Empty Object
    if (!bodyItem || bodyItem.name == "") {
        return false;
    }

    // Check if Skinset or single Bitmap
    const isSkinset = bodyItem.isSkinset;
    let skin;
    let path;
    if (isSkinset) {
        fileName = fileDirection + "/" + fileName;
        skin = bodyItem.name + "/" + fileDirection + "/" + fileName;
        path = "Spriter/" + skin;
    }
    else {
        fileName = name + ".png";
        path = "Spriter/" + bodyItem.name + fileName;
    }

    i.path = path.toLowerCase();
    i.skin = skin;
    i.filePath = fileDirection + "/" + fileName;
    return i;
};

Spriter_Base.prototype.equipmentHasNote = function (equipment) {
    if (equipment) {
        if (this instanceof Spriter_Character) {
            return equipment.meta.Spriter;
        }
        else if (this instanceof Spriter_Battler) {
            return equipment.meta.Spriter_Battler;
        }
    }
};

Spriter_Base.prototype.getActor = function () {
    if (this._character instanceof Game_Player) {
        return $gameParty.leader();
    }
    else if (this._character instanceof Game_Follower) {
        return this._character.actor();
    }
    else if (this._character instanceof Game_Actor) {
        return this._character;
    }
};

Spriter_Base.prototype.getEquipment = function (tag, actor) {
    if (tag == "Weapon") {
        const weaponId = actor._equips[0]._itemId;
        return $dataWeapons[weaponId];
    }
    else {
        let armorId;
        switch (tag) {
            case "Shield":
                armorId = actor._equips[1]._itemId;
                break;
            case "Head":
                armorId = actor._equips[2]._itemId;
                break;
            case "Body":
                armorId = actor._equips[3]._itemId;
                break;
            case "Accessory":
                armorId = actor._equips[4]._itemId;
                break;
        }
        return $dataArmors[armorId];
    }
};

Spriter_Base.prototype.getApparel = function (tag, actor) {
    return actor._apparel[tag] || false;
};

Spriter_Base.prototype.bitmapIsPacked = function (path) {
    return path.contains(SpriterData.texturePackerCharacter);
};

Spriter_Base.prototype.unpackTexture = function (item, skin, filePath) {
    filePath = filePath.replace(SpriterData.texturePackerCharacter, "");
    skin = skin.replace(SpriterData.texturePackerCharacter, "");
    const skinArr = skin.split("/");
    const name = skinArr[skinArr.length - 1];
    const packerData = $texturePacker[name];
    const frame = packerData.frames[filePath].frame;
    const source = packerData.frames[filePath].spriteSourceSize;
    const sourceSize = packerData.frames[filePath].sourceSize;
    const isRotated = packerData.frames[filePath].rotated;
    const texture = $spriterTextures[("/" + SpriterData.spriteFolder + "Spriter/" + skin + "/" + name + ".png").toLowerCase()];
    let originX;
    let originY;
    if (isRotated) {
        item.texture = new PIXI.Texture(texture, new PIXI.Rectangle(frame.x, frame.y, frame.h, frame.w));
        item.texture.rotate = 2;
        originX = source.x - (source.x * item.anchor.y * 2);
        originY = source.y - (source.y * item.anchor.x * 2);
    }
    else {
        item.texture = new PIXI.Texture(texture, new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h));
        originX = source.x - (source.x * item.anchor.x * 2);
        originY = source.y - (source.y * item.anchor.y * 2);
    }

    if (isRotated) {
        item.texture.trim = new PIXI.Rectangle(originY, originX, source.w, source.h);
    }
    else {
        item.texture.trim = new PIXI.Rectangle(originX, originY, source.w, source.h);
    }
};

Spriter_Base.prototype.getRotatedCoordinates = function (x, y) {
    const rotX = (y * Math.cos(Math.PI / 2)) - (x * Math.sin(Math.PI / 2));
    const rotY = (y * Math.sin(Math.PI / 2)) + (x * Math.cos(Math.PI / 2));

    return new PIXI.Point(rotX, rotY);
};

Spriter_Base.prototype.updateBoneBitmap = function (item) {
    if (SpriterData.showSkeleton || this._character._spriter._showSkeleton) {
        const boneId = Number(this._pathTime[item.timelineId].obj);
        const w = Number(this._animation.entity.obj_info[boneId].w);
        const h = 4;
        item.bitmap = new Bitmap(w, h);
        item.bitmap.fillRect(0, -2, w, h, 'black');
        item.bitmap.fillRect(1, -1, w - 2, h - 2, 'white');
    }
};

//-------------------------------------------------------------------------------------------------------------
// Check if item has a Child Sprite and set inheritance
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.updateChildSprites = function (item, w, h) {
    this.addChildSprites(item, w, h);
    this.removeChildSprites(item);
};

Spriter_Base.prototype.addChildSprites = function (item, w, h) {
    const id = item.timelineId;
    const timelineName = this._pathTime[id].name.replace(/\_(\d){3}/, '');
    const childrenSprites = this._childrenSprites;
    const requests = this._character._spriter._spriteRequests;
    for (let i = 0; i < requests.length; i++) {
        if (timelineName == requests[i]._spriteParent) {
            const pivotX = item.anchor.x * w;
            const pivotY = item.anchor.y * h;
            childrenSprites.push(new Spriter_Child(requests[i], pivotX, pivotY));
            const childId = childrenSprites.length - 1;
            const z = item.zIndex;
            this._element[id] = childrenSprites[childId];
            this._element[id].parentGroup = this._group;
            this._element[id].zIndex = z;
            this._element[id].texture = PIXI.Texture.EMPTY;
            this._character._spriter._spriteRequests = [];
            return true;
        }
    }
    return false;
};

Spriter_Base.prototype.removeChildSprites = function (item) {
    const id = item.timelineId;
    const childrenSprites = this._childrenSprites;
    const requests = this._character._spriter._spriteRemoveRequests;
    for (let i = 0; i < requests.length; i++) {
        for (let j = 0; j < childrenSprites.length; j++) {
            if (requests[i] == childrenSprites[j]._character._spriteParent) {
                childrenSprites.splice(j, 1);
                this._character._spriter._spriteRemoveRequests = [];
            }
        }
    }
};

Spriter_Base.prototype.createChildSprites = function (item, w, h) {
    const id = item.timelineId;
    const timelineName = this._pathTime[id].name.replace(/\_(\d){3}/, '');
    const childrenSprites = this._childrenSprites;
    const children = this._character._spriter._spriteChildren;
    for (let i = 0; i < children.length; i++) {
        if (timelineName == children[i]._spriteParent) {
            const pivotX = item.anchor.x * w;
            const pivotY = item.anchor.y * h;
            childrenSprites.push(new Spriter_Child(children[i], pivotX, pivotY));
            const childId = childrenSprites.length - 1;
            const z = item.zIndex;
            this._element[id] = childrenSprites[childId];
            this._element[id].parentGroup = this._group;
            this._element[id].zIndex = z;
            this._element[id].texture = PIXI.Texture.EMPTY;
            this._character._spriter._spriteRequests = [];
            return true;
        }
    }
    return false;
};

//-------------------------------------------------------------------------------------------------------------
// Checks if bone has parent and checks inheritance
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.updateBoneInheritance = function (j) {
    id = this.pathTimeId("bone", j);
    if (this._pathMain[this._key].bone_ref[j].hasOwnProperty('parent')) {
        const parentMainId = this._pathMain[this._key].bone_ref[j].parent;
        const parentTimeId = this.pathTimeId("bone", parentMainId);
        this._element[parentTimeId].addChild(this._element[id]);
    }
    else {
        this._sprite.addChild(this._element[id]);
    }
};

//-------------------------------------------------------------------------------------------------------------
// Checks if object has parent and checks inheritance
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.objectInheritanceUpdate = function (i) {
    id = this.pathTimeId("object", i);
    if (this._pathMain[this._key].object_ref[i].hasOwnProperty('parent')) {
        const parentMainId = this._pathMain[this._key].object_ref[i].parent;
        const parentTimeId = this.pathTimeId("bone", parentMainId);
        this._element[parentTimeId].addChild(this._element[id]);
    }
    else {
        if (this._element[id].parent !== this._sprite || this._element[id].parent === null) {
            this._sprite.addChild(this._element[id]);
        }
    }
    const z = Number(this._pathMain[this._key].object_ref[i].z_index);
    this._element[id].zIndex = z;
};

//-------------------------------------------------------------------------------------------------------------
// Updates item according to the mid-key info.
// Difference in value between two keys is divided with the difference in time between two keys.
// The fraction is added to the previous frame value.
//-------------------------------------------------------------------------------------------------------------
Spriter_Base.prototype.tween = function (item) {

    // Getting Keys & Times
    let pt;
    if (this._repeat && this._speed < 0 && item.currentKeyTime === 0) {
        pt = this._animLength;
    }
    else {
        pt = item.currentKeyTime;
    }

    let nt;
    if (this._repeat && this._speed > 0 && item.currentKeyTime == item.lastKeyTime) {
        nt = this._animLength;
    }
    else if (this._repeat && this._speed < 0 && item.currentKeyTime === 0) {
        nt = item.lastKeyTime;
    }
    else {
        nt = item.nextKeyTime;
    }

    const t = Math.abs((nt - pt) / this._speed);

    // General Values ------------------------------------

    //Getting Previous Key Bone Values
    const pElement = item.type === "object" ? item.currentKey.object : item.currentKey.bone;
    const px = Number(pElement.x) || 0;
    const py = Number(pElement.y) || 0;
    const pr = Number(pElement.angle) || 0;
    const psx = Number(pElement.scale_x) || 1;
    const psy = Number(pElement.scale_y) || 1;

    //Getting Next Key Bone Values
    const nElement = item.type === "object" ? item.nextKey.object : item.nextKey.bone;
    const nx = Number(nElement.x) || 0;
    const ny = Number(nElement.y) || 0;
    let nr = Number(nElement.angle) || 0;
    const nsx = Number(nElement.scale_x) || 1;
    const nsy = Number(nElement.scale_y) || 1;

    //Determining Spin
    const spin = this._speed > 0 ? (Number(item.currentKey.spin) || 1) : -(Number(item.nextKey.spin) || 1);
    let dr;

    if (spin == -1 && nr > pr) {
        nr -= 360;
    }
    else if (spin == 1 && nr < pr) {
        nr += 360;
    }

    // Getting Previous Frame Values 
    const bx = item.x;
    const by = item.y;
    const br = item.rotation;
    const bsx = item.scale.x;
    const bsy = item.scale.y;

    const dt = Math.abs(this._animationFrame - pt);

    let t0;
    let t1;

    if (this._pathMain[this._key].hasOwnProperty("curve_type")) {
        const cType = this._pathMain[this._key].curve_type
        if (cType == "bezier") {
            const Bx = this._speed > 0 ? this._pathMain[this._key].c1 : this._pathMain[this._key].c3;
            const By = this._speed > 0 ? this._pathMain[this._key].c2 : this._pathMain[this._key].c4;
            const Cx = this._speed > 0 ? this._pathMain[this._key].c3 : this._pathMain[this._key].c1;
            const Cy = this._speed > 0 ? this._pathMain[this._key].c4 : this._pathMain[this._key].c2;
            const curve = new UnitBezier(Bx, By, Cx, Cy);
            t0 = curve.solve(dt / Math.abs(nt - pt), UnitBezier.prototype.epsilon);
            t1 = 1 - t0;
        }
        else if (cType == "instant") {
            t0 = 0;
            t1 = 1;
        }
    }
    else {
        t0 = dt / Math.abs(nt - pt);
        t1 = 1 - t0;
    }

    // Setting Bone Values for Current Frame
    item.x = (px * t1) + (nx * t0);
    item.y = (-py * t1) + (-ny * t0);
    item.rotation = ((-pr * t1) + (-nr * t0)) * (Math.PI / 180);
    item.scale.x = (psx * t1) + (nsx * t0);
    item.scale.y = (psy * t1) + (nsy * t0);

    // ---------------------------------------------------

    // Object-specific Values ----------------------------
    if (item.type === "object") {

        // Getting Previous Frame Values
        const a = item.alpha;

        //Getting Previous Key Object Values
        const pa = Number(pElement.a) || 1;

        //Getting Next Key Object Values
        const na = Number(nElement.a) || 1;
        const nax = Number(nElement.pivot_x) || 0;
        const nay = 1 - Number(nElement.pivot_y) || 0;
        const pax = Number(pElement.pivot_x) || 0;
        const pay = 1 - Number(pElement.pivot_y) || 0;

        // Setting Object Values for Current Frame
        item.alpha = (pa * t1) + (na * t0);
        if (this._speed < 0) {
            item.anchor.x = nax;
            item.anchor.y = nay;
        }
    }
    // ---------------------------------------------------


    if (item.type === "object") {
        // Getting Object Values for Key
        const folderId = Number(pElement.folder);
        const fileId = Number(pElement.file);
        const w = Number(this._animation.folder[folderId].file[fileId].width);
        const h = Number(this._animation.folder[folderId].file[fileId].height);
        if (this._character._spriter.forceUpdate) {
            if (!this.updateChildSprites(item, w, h)) {
                this.updateTexture(item);
            }
        }
    }

    // Set Texture for Sprite ----------------------------
    // this._character._spriter.forceUpdate is True when when the player uses a plugin command to change Bitmaps
    else {
        if (this._character._spriter.forceUpdate) {
            this.updateTexture(item);
        }
    }
    // ---------------------------------------------------

    // Check Tags for Sprite Changes ---------------------
    //this.setFromMeta(item);
    // ---------------------------------------------------

};

//-------------------------------------------------------------------------------------------------------------
// Updating Tags and Vars
//-------------------------------------------------------------------------------------------------------------

Spriter_Base.prototype.updateTagsAndVars = function () {
    let map;
    let id;
    let event;

    //Check if Meta exists
    if (this._animation.entity.animation[this._animationId].hasOwnProperty('meta')) {

        for (let i = 0; i < this._metaKeyArray.length; i++) {

            // If time exists in Meta Key Array times
            if (this.isKeyTime(this._metaKeyArray[i])) {

                // Update Vars
                if (this._animation.entity.animation[this._animationId].meta.hasOwnProperty('varline')) {
                    const varline = this._animation.entity.animation[this._animationId].meta.varline;

                    // Check all Vars
                    for (let i = 0; i < varline.length; i++) {

                        // Check all Var Keys
                        for (let j = 0; j < varline[i].key.length; j++) {
                            const time = Number(varline[i].key[j].time);
                            if (this.isKeyTime(time)) {
                                const varId = Number(varline[i].def);
                                const def = this._animation.entity.var_defs.i[varId];
                                if (def.type === "string") {
                                    this._character._spriter.var[def.name] = varline[i].key[j].val;
                                    this._globalAnimationInfo.var[def.name] = varline[i].key[j].val;
                                }
                                else if (def.type === "int") {
                                    this._character._spriter.var[def.name] = parseInt(varline[i].key[j].val);
                                    this._globalAnimationInfo.var[def.name] = parseInt(varline[i].key[j].val);
                                }
                                else if (def.type === "float") {
                                    this._character._spriter.var[def.name] = parseFloat(varline[i].key[j].val);
                                    this._globalAnimationInfo.var[def.name] = parseFloat(varline[i].key[j].val);
                                }
                            }
                        }
                    }
                }

                // Update Tags
                if (this._animation.entity.animation[this._animationId].meta.hasOwnProperty('tagline')) {
                    const tagline = this._animation.entity.animation[this._animationId].meta.tagline;
                    this._character._spriter.tag = [];
                    this._globalAnimationInfo.tag = [];

                    // Check all Keys in Tagline
                    for (let i = 0; i < tagline.key.length; i++) {
                        const time = Number(tagline.key[i].time);
                        if (this.isKeyTime(time)) {
                            if (tagline.key[i].tag) {

                                // Check all Tags in Key 
                                for (let j = 0; j < tagline.key[i].tag.length; j++) {

                                    const tag = tagline.key[i].tag[j];
                                    const tagName = this._animation.tag_list.i[tag.t];
                                    this._character._spriter.tag.push(tagName);
                                    this._globalAnimationInfo.tag.push(tagName);

                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

// Making Sure that the Meta updates either in its key, or, in case the key is skipped because of this._speed, right after the key. 
Spriter_Base.prototype.isKeyTime = function (time) {
    return this._animationFrame == time || (this._animationFrame > time && this._animationFrame < time + this._speed);
}

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Spriter_Character
//*************************************************************************************************************
// Creates Spriter character for overworld
//-------------------------------------------------------------------------------------------------------------

function Spriter_Character() {
    this.initialize.apply(this, arguments);
}


Spriter_Character.prototype = Object.create(Spriter_Base.prototype);
Spriter_Character.prototype.constructor = Spriter_Character;

Spriter_Character.prototype.initialize = function (character) {
    Spriter_Base.prototype.initialize.call(this, character);
    this.start();
};

Spriter_Character.prototype.initMembers = function () {
    Spriter_Base.prototype.initMembers.call(this);
    this._balloonDuration = 0;
    this._tilesetId = 0;
    this._resetter = false;
    this._recovery = "snap";
    this._globalAnimationInfo = null;
};

Spriter_Character.prototype.setCharacter = function (character) {
    Spriter_Base.prototype.setCharacter.call(this, character);

    this._animationId = (character._direction - 2) / 2;
    this._recovery = this._character._spriter._recovery;

    //Getting Globals
    if (this._character.constructor === Game_Player) {
        this._globalAnimationInfo = $infoSpriter.player;
    }
    else if (this._character.constructor === Game_Event) {
        const map = String(this._character._mapId);
        const id = String(this._character._eventId);
        this._globalAnimationInfo = $infoSpriter.maps["map_" + map]["event_" + id];
    }
    else if (this._character.constructor === Game_Follower) {
        const folId = String(this._character._memberIndex);
        this._globalAnimationInfo = $infoSpriter.followers["follower_" + folId];
    }

    // Initializing animation components

    if (!this._globalAnimationInfo.hasOwnProperty("bones")) {
        this._globalAnimationInfo.bones = {};
    }
    if (!this._globalAnimationInfo.hasOwnProperty("objects")) {
        this._globalAnimationInfo.objects = {};
    }
    if (!this._globalAnimationInfo.hasOwnProperty("tag")) {
        this._globalAnimationInfo.tag = [];
    }
    if (!this._globalAnimationInfo.hasOwnProperty("var")) {
        this._globalAnimationInfo.var = {};
    }
    if (this._character._direction == this._globalAnimationInfo.dir) {
        this._animationFrame = this._globalAnimationInfo.frame || 0;
        this._key = this._globalAnimationInfo.key || 0;
    }
    else {
        this._animationFrame = 0;
        this._key = 0;
    }
};

//-------------------------------------------------------------------------------------------------------------
// Draw First Sprite. 
// In case the Sprite has been used before, this._globalAnimationIfo will replace animation values
//-------------------------------------------------------------------------------------------------------------
Spriter_Character.prototype.start = function () {
    Spriter_Base.prototype.start.call(this);
    this.setInitialCharacter();
};

Spriter_Character.prototype.setInitialCharacter = function () {

    let item;
    this._pathMain = this._animation.entity.animation[this._animationId].mainline.key;
    this._pathTime = this._animation.entity.animation[this._animationId].timeline;

    if (!this._pathMain[this._key]) {
        this._key = 0;
    }

    // Set Bones

    if (this._pathMain[this._key].hasOwnProperty('bone_ref')) {

        //Setting Bone Inheritance
        for (let j = 0; j < this._pathMain[this._key].bone_ref.length; j++) {
            this.updateBoneInheritance(j);
        }

        // Setting Bone Values
        for (let n = 0; n < this._pathMain[this._key].bone_ref.length; n++) {
            id = Number(this._pathMain[this._key].bone_ref[n].timeline);
            item = this._element[id];
            item.timelineId = id;
            item.key = Number(this._pathMain[this._key].bone_ref[n].key); // Id of bone key for this._key
            item.currentKey = this._pathTime[item.timelineId].key[item.key];
            item.type = "bone";
            this.setInitialElements(n, item);
        }
    }

    if (this._pathMain[this._key].hasOwnProperty('object_ref')) {

        //Going through all Objects for Current Key
        for (let i = 0; i < this._pathMain[this._key].object_ref.length; i++) {
            id = Number(this._pathMain[this._key].object_ref[i].timeline);
            item = this._element[id];
            item.timelineId = id;
            item.key = Number(this._pathMain[this._key].object_ref[i].key); // Id of bone key for this._key
            item.currentKey = this._pathTime[item.timelineId].key[item.key];
            item.type = "object";
            this.setInitialElements(i, item);

        }
    }
};

Spriter_Character.prototype.setInitialElements = function (n, item) {

    const globals = this._globalAnimationInfo;
    let elementGlobal;
    let w;
    let h;
    const element = item.type === "object" ? item.currentKey.object : item.currentKey.bone;
    const folderId = Number(element.folder);
    const fileId = Number(element.file);

    if (item.type === "object") {

        // Reset Inheritance
        if (!globals.objects.hasOwnProperty("object_" + Number(item.timelineId))) {
            globals.objects["object_" + Number(item.timelineId)] = {};
        }
        elementGlobal = globals.objects["object_" + Number(item.timelineId)];

        // Set Inheritance
        if (this._pathMain[this._key].object_ref[n].hasOwnProperty('parent')) {
            const parentMainId = this._pathMain[this._key].object_ref[n].parent;
            const parentTimeId = this.pathTimeId("bone", parentMainId);
            this._element[parentTimeId].addChild(item);
        }
        else {
            this._sprite.addChild(item);

        }

        w = Number(this._animation.folder[folderId].file[fileId].width);
        h = Number(this._animation.folder[folderId].file[fileId].height);

    }
    else {
        if (!globals.bones.hasOwnProperty("bone_" + Number(item.timelineId))) {
            globals.bones["bone_" + Number(item.timelineId)] = {};
        }
        elementGlobal = globals.bones["bone_" + Number(item.timelineId)];
    }

    const ex = Number(element.x) || 0;
    const ey = Number(element.y) || 0;
    const er = Number(element.angle) || 0;
    const esx = Number(element.scale_x) || 1;
    const esy = Number(element.scale_y) || 1;
    const x = elementGlobal.x || ex;
    const y = elementGlobal.y || -ey;
    item.x = x;
    item.y = y;
    item.rotation = elementGlobal.r || -er * Math.PI / 180;
    item.scale.x = elementGlobal.sx || esx;
    item.scale.y = elementGlobal.sy || esy;

    if (item.type === "object") {

        const eax = Number(element.pivot_x) || 0;
        const eay = 1 - Number(element.pivot_y) || 0;
        const ea = Number(element.a) || 1;
        const z = Number(this._pathMain[this._key].object_ref[n].z_index);

        item.alpha = elementGlobal.a || ea;
        item.anchor.x = elementGlobal.ex || eax;
        item.anchor.y = elementGlobal.ey || eay;
        item.zIndex = elementGlobal.z || z;
        item.tags = elementGlobal.tags || [];
        item.vars = elementGlobal.vars || {};

        if (!this.createChildSprites(item, w, h)) {
            this.updateTexture(item);
        }
    }
};

Spriter_Character.prototype.update = function () {
    this.updateSpriterCharacter()
};

Spriter_Character.prototype.updateSpriterCharacter = function () {
    this.updateDirection();
    Spriter_Base.prototype.update.call(this);
    this.updatePosition();
    this.updateOther();
};

Spriter_Character.prototype.updateFrame = function () {
    Spriter_Base.prototype.updateFrame.call(this);
    this._globalAnimationInfo.key = this._key;
    this._globalAnimationInfo.frame = this._animationFrame;
};

Spriter_Character.prototype.setOnKey = function (item) {
    Spriter_Base.prototype.setOnKey.call(this, item);

    //Storing Values to Global Variable 
    this.storeToGlobal(item);
}

Spriter_Character.prototype.tween = function (item) {
    Spriter_Base.prototype.tween.call(this, item);

    //Storing Values to Global Variable 
    this.storeToGlobal(item);
}

Spriter_Character.prototype.updateObjectTexture = function (item) {
    const i = Spriter_Base.prototype.updateObjectTexture.call(this, item);

    // In case a texture is loaded from an equipment type and equipent type is empty, do not load texture.
    if (i) {
        // Set Bitmap
        if (this.bitmapIsPacked(i.path)) {

            this.unpackTexture(item, i.skin, i.filePath);
        }
        else {
            item.name = i.path;
            if (!$spriterTextures["/img/characters/" + i.path]) {
                throw "Image: " + "/img/characters/" + i.path + " does not exist.";
            }

            item.texture = $spriterTextures["/img/characters/" + i.path];
        }
    }
    else {
        item.texture = PIXI.Texture.EMPTY;
    }
};


//-------------------------------------------------------------------------------------------------------------
// Storing Element values to global
//-------------------------------------------------------------------------------------------------------------
Spriter_Character.prototype.storeToGlobal = function (item) {
    let characterGlobal;
    if (this._character.constructor === Game_Player) {
        characterGlobal = $infoSpriter.player;
    }
    else if (this._character.constructor === Game_Event) {
        const map = String(this._character._mapId);
        const id = String(this._character._eventId);
        characterGlobal = $infoSpriter.maps["map_" + map]["event_" + id];
    }
    else if (this._character.constructor === Game_Follower) {
        const folId = String(this._character._memberIndex);
        characterGlobal = $infoSpriter.followers["follower_" + folId];
    }
    else {
        const map = String($gameMap._mapId);
        const name = String(this._character._name);
        characterGlobal = $infoSpriter.maps["map_" + map]._children["child_" + name];
    }
    characterGlobal.dir = this._character._direction;
    if (item.type === "bone") {
        if (!characterGlobal.bones.hasOwnProperty(item.type + "_" + String(item.timelineId))) {
            characterGlobal.bones[item.type + "_" + String(item.timelineId)] = {};
        }
        const bone = characterGlobal.bones[item.type + "_" + String(item.timelineId)];
        bone.x = item.x;
        bone.y = item.y;
        bone.r = item.rotation;
        bone.sx = item.scale.x;
        bone.sy = item.scale.y;
        bone.tags = item.tags;
        bone.vars = item.vars;
    }
    else if (item.type === "object") {
        if (!characterGlobal.objects.hasOwnProperty(item.type + "_" + String(item.timelineId))) {
            characterGlobal.objects[item.type + "_" + String(item.timelineId)] = {};
        }
        const object = characterGlobal.objects[item.type + "_" + String(item.timelineId)];
        object.x = item.x;
        object.y = item.y;
        object.r = item.rotation;
        object.a = item.alpha;
        object.ax = item.anchor.x;
        object.ay = item.anchor.y;
        object.sx = item.scale.x;
        object.sy = item.scale.y;
        object.z = item.zIndex;
        object._fileName = item._fileName;
        object.tags = item.tags;
        object.vars = item.vars;
    }
};

//-------------------------------------------------------------------------------------------------------------
// Functions shared with Sprite_Characters
//-------------------------------------------------------------------------------------------------------------

Spriter_Character.prototype.updateVisibility = function () {
    Spriter_Base.prototype.updateVisibility.call(this);
    if (this._spriteType == 'character' && this._character.isTransparent()) {
        this.visible = false;
    }
};

Spriter_Character.prototype.updatePosition = function () {
    if (this._spriteType == 'character') {
        this.x = this._character.screenX();
        this.y = this._character.screenY();
        this.z = this._character.screenZ();
    }
};

Spriter_Character.prototype.updateAnimation = function () {
    this.setupAnimation();
    if (!this.isAnimationPlaying()) {
        this._character.endAnimation();
    }
    if (!this.isBalloonPlaying()) {
        this._character.endBalloon();
    }
};

Spriter_Character.prototype.updateOther = function () {
    if (this._spriteType == 'character') {
        this.opacity = this._character.opacity();
        this.blendMode = this._character.blendMode();
        this._bushDepth = this._character.bushDepth();
    }
};

Spriter_Character.prototype.setupAnimation = function () {
    if (this._character.animationId() > 0) {
        const animation = $dataAnimations[this._character.animationId()];
        this.startAnimation(animation, false, 0);
        this._character.startAnimation();
    }
};

Spriter_Character.prototype.setupBalloon = function () {
    if (this._character.balloonId() > 0) {
        this.startBalloon();
        this._character.startBalloon();
    }
};

Spriter_Character.prototype.startBalloon = function () {
    if (!this._balloonSprite) {
        this._balloonSprite = new Sprite_Balloon();
    }
    this._balloonSprite.setup(this._character.balloonId());
    this.parent.addChild(this._balloonSprite);
};

Spriter_Character.prototype.updateBalloon = function () {
    this.setupBalloon();
    if (this._balloonSprite) {
        this._balloonSprite.x = this.x;
        this._balloonSprite.y = this.y - this.height;
        if (!this._balloonSprite.isPlaying()) {
            this.endBalloon();
        }
    }
};

Spriter_Character.prototype.endBalloon = function () {
    if (this._balloonSprite) {
        this.parent.removeChild(this._balloonSprite);
        this._balloonSprite = null;
    }
};

Spriter_Character.prototype.isBalloonPlaying = function () {
    return !!this._balloonSprite;
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Children Attached on Spriter sprites.
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

function Spriter_Child() {
    this.initialize.apply(this, arguments);
}

Spriter_Child.prototype = Object.create(Spriter_Base.prototype);
Spriter_Child.prototype.constructor = Spriter_Child;

Spriter_Child.prototype.initialize = function (character, pivotX, pivotY) {
    Spriter_Base.prototype.initialize.call(this, character);
    this._sprite.x = -pivotX;
    this._sprite.y = -pivotY;
};

Spriter_Child.prototype.displaceSprite = function () {
};

Spriter_Child.prototype.update = function () {
    Spriter_Base.prototype.update.call(this);
};

Spriter_Child.prototype.updateObjectTexture = function (item) {
    const i = Spriter_Base.prototype.updateObjectTexture.call(this, item);

    // Set Bitmap
    if (this.bitmapIsPacked(i.path)) {
        this.unpackTexture(item, i.skin, i.filePath);
    }
    else {
        item.name = i.path;
        item.texture = $spriterTextures["/img/characters/" + i.path];
    }
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Animations Made with Spriter
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

const spriter_alias_Sprite_Base_startAnimation = Sprite_Base.prototype.startAnimation;
Sprite_Base.prototype.startAnimation = function (animation, mirror, delay) {

    const data = $dataAnimations[animation.id];
    const sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Setting Global For Children Sprites
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Setting Global For Spriter Animations / TexturePacker Data / Textures / imgAnimations
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

var $spriterAnimations = {};
var $texturePacker = {};
var $spriterTextures = {};
var $dataSpriterObjects = [];
var $dataSpriterImgAnimations = [];

const spriter_alias_Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function () {
    spriter_alias_Scene_Boot_create.call(this);
    this.loadSpriterAnimations(SpriterData.animFolder);
    this.loadTexturePackerJSONs("/" + SpriterData.spriteFolder + "Spriter/");
    this.loadTextures("/" + SpriterData.spriteFolder + "Spriter/");
    //this.loadSpriterImgAnimations();
    this.loadChildrenSprites();
};

Scene_Boot.prototype.loadSpriterAnimations = function (path) {
    const files = getFiles("/" + path);
    for (let i = 0; i < files.length; i++) {
        if (!this.isDirectory("/" + path + files[i])) {
            fetchSCMLFile(path + files[i], setSpriterData, files[i]);
        }
    }
};

Scene_Boot.prototype.loadSpriterImgAnimations = function () {
    fetchJSONFile('data/CommonEvents.json', function (data, name) {
        const commonEvent = data[SpriterData.sAnimationsID];
        const childrenList = [];
        if (commonEvent) {
            for (let i = 0; i < commonEvent.list.length; i++) {

                // Check if command is Comment
                if (commonEvent.list[i].code == 108) {

                    // Isolates the Comment string
                    let comment = commonEvent.list[i].parameters[0];
                    comment = comment.substring(1, comment.length - 1);

                    // Makes Array
                    const commentData = comment.split(',');

                    // Makes Child
                    const child = {};
                    child._name = commentData[0];
                    child._spriter = {
                        _skeleton: commentData[1],
                        _skin: "img/animations/Spriter",
                        _skinParts: [],
                        _spriteChildren: [],
                        _speed: commentData[2],
                        _cellX: commentData[3],
                        _cellY: commentData[4],
                        _recovery: "snap",
                        _tag: null,
                        _var: null,
                        _stop: false
                    };
                    childrenList.push(child);
                }
            }
            $dataSpriterImgAnimations = childrenList;
        }
    });
};

Scene_Boot.prototype.loadChildrenSprites = function () {
    fetchJSONFile('data/CommonEvents.json', function (data, name) {
        const commonEvent = data[SpriterData.sObjectsID];
        const childrenList = [];
        if (commonEvent) {
            for (let i = 0; i < commonEvent.list.length; i++) {

                // Check if command is Comment
                if (commonEvent.list[i].code == 108) {

                    // Isolates the Comment string
                    let comment = commonEvent.list[i].parameters[0];
                    comment = comment.substring(1, comment.length - 1);

                    // Makes Array
                    const commentData = comment.split(',');

                    // Makes Child
                    const child = {};
                    child._name = commentData[0];
                    child._spriter = {
                        _skeleton: commentData[1],
                        _skin: commentData[2],
                        _skinParts: [],
                        _spriteChildren: [],
                        _speed: commentData[3],
                        _cellX: commentData[4],
                        _cellY: commentData[5],
                        _recovery: "snap",
                        _tag: null,
                        _var: null,
                        _stop: false
                    };
                    childrenList.push(child);
                }
            }
            $dataSpriterObjects = childrenList;
        }
    });
};

Scene_Boot.prototype.loadTexturePackerJSONs = function (dir) {
    const mainFolder = this.getDirContents(dir);
    for (let i = 0; i < mainFolder.length; i++) {
        let path = dir + mainFolder[i];
        if (mainFolder[i].slice(-5) === ".json") {
            fetchJSONFile(path.substr(1), setTexturePackerData, mainFolder[i].replace(".json", ""));
        }
        else if (this.isDirectory(path)) {
            path = path + "/";
            this.loadTexturePackerJSONs(path);
        }
    }
};

Scene_Boot.prototype.getDirContents = function (dir) {
    const files = [];
    const fs = require('fs');
    const path = require('path');
    const base = path.dirname(process.mainModule.filename);
    fs.readdirSync(CS_URL.MapURL(base + dir)).forEach(function (file) {
        files.push(file);
    });
    return files;
};

Scene_Boot.prototype.loadTextures = function (dir) {
    const outPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    const mainFolder = this.getDirContents(dir);
    for (let i = 0; i < mainFolder.length; i++) {
        let path = dir + mainFolder[i];
        if (mainFolder[i].slice(-4) === ".png") {
            $spriterTextures[path.toLowerCase()] = PIXI.Texture.from(CS_URL.MapURL(outPath + path));
        }
        else if (this.isDirectory(path)) {
            path = path + "/";
            this.loadTextures(path);
        }
    }
};

Scene_Boot.prototype.getDirContents = function (dir) {
    const files = [];
    const fs = require('fs');
    const path = require('path');
    const base = path.dirname(process.mainModule.filename);
    fs.readdirSync(CS_URL.MapURL(base + dir)).forEach(function (file) {
        files.push(file);
    });
    return files;
};

Scene_Boot.prototype.isDirectory = function (path) {
    const fs = require('fs');
    const basePath = require('path');
    const base = basePath.dirname(process.mainModule.filename);
    try {
        if (fs.lstatSync(CS_URL.MapURL(base + path)).isDirectory()) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        // Handle error
        if (e.code == 'ENOENT') {
            return false;
        }
        else {
            return false;
        }
    }
};

//-------------------------------------------------------------------------------------------------------------
// Get Animation File
//-------------------------------------------------------------------------------------------------------------

// Fetch Function with Callback.

function fetchSCMLFile(path, callback, name) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            const data = XML2jsobj(httpRequest.responseXML.documentElement);
            if (callback) callback(data, name);
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function fetchJSONFile(path, callback, name) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            const data = JSON.parse(this.responseText);
            if (callback) callback(data, name);
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

function setSpriterData(data, name) {
    createAnimationGlobal(data, name);
}

function setTexturePackerData(data, name) {
    createTexturePackerGlobal(data, name);
}

//-------------------------------------------------------------------------------------------------------------     
// Creates Optimized Global
//-------------------------------------------------------------------------------------------------------------     
function createAnimationGlobal(data, name) {
    obj2Arr(data);
    $spriterAnimations[name] = data;
    if (SpriterData.logAnimations) {
        console.log(name);
        console.log(data);
        console.log('-----------------');
    }
}

function createTexturePackerGlobal(data, name) {
    $texturePacker[name] = data;
    if (SpriterData.logAnimations) {
        console.log(name);
        console.log(data);
        console.log('-----------------');
    }
}

//-------------------------------------------------------------------------------------------------------------     
// Turns objects to Arrays with one element, to conform simple animations to the usual format.
//-------------------------------------------------------------------------------------------------------------     
function obj2Arr(data) {
    let temp;

    if (!data.hasOwnProperty('folder')) {
        data.folder = [];
    }

    // folder
    if (data.folder.constructor == Object) {
        temp = data.folder;
        delete data.folder;
        data.folder = [temp];
    }

    for (let h = 0; h < data.folder.length; h++) {
        // file
        if (data.folder[h].file.constructor == Object) {
            temp = data.folder[h].file;
            delete data.folder[h].file;
            data.folder[h].file = [temp];
        }
    }

    // tag_list
    if (data.hasOwnProperty("tag_list")) {
        if (data.tag_list.i.constructor == Object) {
            temp = data.tag_list.i;
            delete data.tag_list.i;
            data.tag_list.i = [temp];
        }
    }

    // object info
    if (data.entity.hasOwnProperty("obj_info")) {
        if (data.entity.obj_info.constructor === Object) {
            temp = data.entity.obj_info;
            delete data.entity.obj_info;
            data.entity.obj_info = [temp];
        }
    }

    // animation
    if (data.entity.animation.constructor == Object) {
        temp = data.entity.animation;
        delete data.entity.animation;
        data.entity.animation = [temp];
    }

    if (data.entity.hasOwnProperty("var_defs")) {
        if (data.entity.var_defs.i.constructor == Object) {
            temp = data.entity.var_defs.i;
            delete data.entity.var_defs.i;
            data.entity.var_defs.i = [temp];
        }
    }

    // meta
    for (let i = 0; i < data.entity.animation.length; i++) {

        // varline
        if (data.entity.animation[i].hasOwnProperty("meta")) {
            if (data.entity.animation[i].meta.hasOwnProperty("varline")) {
                if (data.entity.animation[i].meta.varline.constructor == Object) {
                    temp = data.entity.animation[i].meta.varline;
                    delete data.entity.animation[i].meta.varline;
                    data.entity.animation[i].meta.varline = [temp];
                }
                for (let j = 0; j < data.entity.animation[i].meta.varline.length; j++) {
                    if (data.entity.animation[i].meta.varline[j].key.constructor == Object) {
                        temp = data.entity.animation[i].meta.varline[j].key;
                        delete data.entity.animation[i].meta.varline[j].key;
                        data.entity.animation[i].meta.varline[j].key = [temp];
                    }
                }
            }

            // tagline
            if (data.entity.animation[i].meta.hasOwnProperty("tagline")) {
                if (data.entity.animation[i].meta.tagline.key.constructor == Object) {
                    temp = data.entity.animation[i].meta.tagline.key;
                    delete data.entity.animation[i].meta.tagline.key;
                    data.entity.animation[i].meta.tagline.key = [temp];
                }
                for (let j = 0; j < data.entity.animation[i].meta.tagline.key.length; j++) {
                    if (data.entity.animation[i].meta.tagline.key[j].tag) {
                        if (data.entity.animation[i].meta.tagline.key[j].tag.constructor == Object) {
                            temp = data.entity.animation[i].meta.tagline.key[j].tag;
                            delete data.entity.animation[i].meta.tagline.key[j].tag;
                            data.entity.animation[i].meta.tagline.key[j].tag = [temp];
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < data.entity.animation.length; i++) {

        // mainline.key
        if (data.entity.animation[i].mainline.key.constructor == Object) {
            temp = data.entity.animation[i].mainline.key;
            delete data.entity.animation[i].mainline.key;
            data.entity.animation[i].mainline.key = [temp];
        }

        for (let j = 0; j < data.entity.animation[i].mainline.key.length; j++) {

            // mainline.key[].bone_ref
            if (data.entity.animation[i].mainline.key[j].hasOwnProperty('bone_ref')) {
                if (data.entity.animation[i].mainline.key[j].bone_ref.constructor == Object) {
                    temp = data.entity.animation[i].mainline.key[j].bone_ref;
                    delete data.entity.animation[i].mainline.key[j].bone_ref;
                    data.entity.animation[i].mainline.key[j].bone_ref = [temp];
                }
            }


            // mainline.key[].object_ref
            if (data.entity.animation[i].mainline.key[j].hasOwnProperty('object_ref')) {
                if (data.entity.animation[i].mainline.key[j].object_ref.constructor == Object) {
                    temp = data.entity.animation[i].mainline.key[j].object_ref;
                    delete data.entity.animation[i].mainline.key[j].object_ref;
                    data.entity.animation[i].mainline.key[j].object_ref = [temp];
                }
            }
        }

        // timeline
        if (!data.entity.animation[i].hasOwnProperty('timeline')) {
            data.entity.animation[i].timeline = [];
        }

        if (data.entity.animation[i].timeline.constructor == Object) {
            temp = data.entity.animation[i].timeline;
            delete data.entity.animation[i].timeline;
            data.entity.animation[i].timeline = [temp];
        }

        for (let k = 0; k < data.entity.animation[i].timeline.length; k++) {

            // timeline[].key
            if (data.entity.animation[i].timeline[k].key.constructor == Object) {
                temp = data.entity.animation[i].timeline[k].key;
                delete data.entity.animation[i].timeline[k].key;
                data.entity.animation[i].timeline[k].key = [temp];
            }
            if (data.entity.animation[i].timeline[k].hasOwnProperty('meta')) {
                if (data.entity.animation[i].timeline[k].meta.hasOwnProperty('tagline')) {
                    if (data.entity.animation[i].timeline[k].meta.tagline.key.constructor == Object) {
                        temp = data.entity.animation[i].timeline[k].meta.tagline.key;
                        delete data.entity.animation[i].timeline[k].meta.tagline.key;
                        data.entity.animation[i].timeline[k].meta.tagline.key = [temp];
                    }

                    for (let l = 0; l < data.entity.animation[i].timeline[k].meta.tagline.key.length; l++) {
                        if (!data.entity.animation[i].timeline[k].meta.tagline.key[l].tag) {
                            data.entity.animation[i].timeline[k].meta.tagline.key[l].tag = [];
                        }
                        if (data.entity.animation[i].timeline[k].meta.tagline.key[l].tag.constructor == Object) {
                            temp = data.entity.animation[i].timeline[k].meta.tagline.key[l].tag;
                            delete data.entity.animation[i].timeline[k].meta.tagline.key[l].tag;
                            data.entity.animation[i].timeline[k].meta.tagline.key[l].tag = [temp];
                        }
                    }
                }
                else if (data.entity.animation[i].timeline[k].meta.hasOwnProperty('varline')) {
                    if (!data.entity.animation[i].timeline[k].meta.varline) {
                        data.entity.animation[i].timeline[k].meta.varline = [];
                    }
                    if (data.entity.animation[i].timeline[k].meta.varline.constructor == Object) {
                        temp = data.entity.animation[i].timeline[k].meta.varline;
                        delete data.entity.animation[i].timeline[k].meta.varline;
                        data.entity.animation[i].timeline[k].meta.varline = [temp];
                    }


                    for (let m = 0; m < data.entity.animation[i].timeline[k].meta.varline.length; m++) {
                        if (data.entity.animation[i].timeline[k].meta.varline[m].key.constructor == Object) {
                            temp = data.entity.animation[i].timeline[k].meta.varline[m].key;
                            delete data.entity.animation[i].timeline[k].meta.varline[m].key;
                            data.entity.animation[i].timeline[k].meta.varline[m].key = [temp];
                        }
                    }
                }
            }
        }
    }

    if (data.hasOwnProperty('obj_info')) {
        for (let i = 0; i < data.entity.obj_info.length; i++) {
            if (data.entity.obj_info[i].hasOwnProperty('var_defs')) {
                if (data.entity.obj_info[i].var_defs.i.constructor == Object) {
                    temp = data.entity.obj_info[i].var_defs.i;
                    delete data.entity.obj_info[i].var_defs.i;
                    data.entity.obj_info[i].var_defs.i = [temp];
                }
            }
        }
    }


    // atlas
    if (data.hasOwnProperty("atlas")) {
        if (data.atlas.i.constructor == Object) {
            temp = data.atlas.i;
            delete data.atlas.i;
            data.atlas.i = [temp];
        }
    }
}

// Converts xml File to js Object
function XML2jsobj(node) {

    const data = {};

    // Append a value
    function Add(name, value) {
        if (data[name]) {
            if (data[name].constructor != Array) {
                data[name] = [data[name]];
            }
            data[name][data[name].length] = value;
        }
        else {
            data[name] = value;
        }
    }

    // Element attributes
    var cn;
    for (let c = 0; cn = node.attributes[c]; c++) {
        Add(cn.name, cn.value);
    }

    // Child elements
    for (let c = 0; cn = node.childNodes[c]; c++) {
        if (cn.nodeType == 1) {
            if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
                // text value
                Add(cn.nodeName, cn.firstChild.nodeValue);
            }
            else {
                // sub-object
                Add(cn.nodeName, XML2jsobj(cn));
            }
        }
    }

    return data;
}

function getFiles(dir) {
    const files = [];
    const path = require('path');
    const base = path.dirname(process.mainModule.filename);
    const fs = require('fs');
    fs.readdirSync(base + dir).forEach(function (file) {
        files.push(file);
    });
    return files;
}

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Plugin Commands
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

const spriter_alias_game_interpreter_command356 = Game_Interpreter.prototype.command356;
Game_Interpreter.prototype.command356 = function () {
    if (SpriterData.evaluateParameters) {
        const args = this._params[0].split(" ");
        for (let i = 1; i < args.length; i++) {
            if (args[i].contains("var_")) {
                args[i] = eval(args[i].replace("var_", ""));
            }
        }
        const command = args.shift();
        this.pluginCommand(command, args);
    }
    else {
        spriter_alias_game_interpreter_command356.call(this);
    }
    return true;
};

// Plugin Commands

const spriter_alias_game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    spriter_alias_game_interpreter_pluginCommand.call(this, command, args);

    if (command === "changeApparel") {
        const actor = $gameActors.actor(args[0]);
        if (actor) {
            actor.changeApparel(args[1], args[2], eval(args[3]), eval(args[4]));
        }
    }

    //-------------------------------------------------------------------------------------------------------------     
    // Events
    //-------------------------------------------------------------------------------------------------------------     
    if (command === "eventSkeleton") {
        const event = $gameMap.event(args[0])._spriter;
        const mapId = "map_" + String($gameMap.event(args[0])._mapId);
        const eventId = "event_" + String($gameMap.event(args[0])._eventId);
        const eventGlobalInfo = $infoSpriter.maps[mapId][eventId];
        event._skeleton = args[1];
        eventGlobalInfo._skeleton = event._skeleton;
        event._skin = args[2];
        event._skinParts = [];
        eventGlobalInfo._skin = event._skin;
        eventGlobalInfo._skinParts = [];
    }
    else if (command === "eventSkin") {
        const event = $gameMap.event(args[0])._spriter;
        event.forceUpdate = true;
        const mapId = "map_" + String($gameMap.event(args[0])._mapId);
        const eventId = "event_" + String($gameMap.event(args[0])._eventId);
        const eventGlobalInfo = $infoSpriter.maps[mapId][eventId];
        event._skin = args[1];
        event._skinParts = [];
        eventGlobalInfo._skin = event._skin;
        eventGlobalInfo._skinParts = [];
    }
    else if (command === "eventSpeed") {
        const event = $gameMap.event(args[0])._spriter;
        const mapId = "map_" + String($gameMap.event(args[0])._mapId);
        const eventId = "event_" + String($gameMap.event(args[0])._eventId);
        const eventGlobalInfo = $infoSpriter.maps[mapId][eventId];
        event._speed = Number(args[1]);
        eventGlobalInfo._speed = $gameMap.event(args[0])._speed;
    }
    else if (command === "eventStop") {
        const event = $gameMap.event(args[0])._spriter;
        const mapId = "map_" + String($gameMap.event(args[0])._mapId);
        const eventId = "event_" + String($gameMap.event(args[0])._eventId);
        const eventGlobalInfo = $infoSpriter.maps[mapId][eventId];
        event._stop = eval(args[1]);
        eventGlobalInfo._stop = $gameMap.event(args[0])._spriter._stop;
    }
    else if (command === "eventRecovery") {
        const event = $gameMap.event(args[0])._spriter;
        const mapId = "map_" + String($gameMap.event(args[0])._mapId);
        const eventId = "event_" + String($gameMap.event(args[0])._eventId);
        const eventGlobalInfo = $infoSpriter.maps[mapId][eventId];
        event._recovery = args[1];
        eventGlobalInfo._recovery = $gameMap.event(args[0])._recovery;
    }
    else if (command === "eventSkinPart") {
        $gameMap.event(args[0]).changeSkinPart(args[1], args[2], args[3]);
    }
    else if (command === "eventRemoveSkinPart") {
        $gameMap.event(args[0]).removeSkinPart(args[1]);
    }
    else if (command === "eventChildSprite") {
        $gameMap.event(args[0]).createChildSprite(args[1], args[2]);
    }
    else if (command === "eventRemoveChildSprite") {
        $gameMap.event(args[0]).removeChildSprite(args[1]);
    }

    //-------------------------------------------------------------------------------------------------------------     
    // Player
    //-------------------------------------------------------------------------------------------------------------     

    else if (command === "playerSkeleton") {
        const playerGlobalInfo = $infoSpriter.player;
        $gamePlayer._spriter._skeleton = args[0];
        playerGlobalInfo._skeleton = args[0];
        $gamePlayer._spriter._skin = args[1];
        playerGlobalInfo._skin = args[1];
    }
    else if (command === "playerSkin") {
        $gamePlayer._spriter.forceUpdate = true;
        const playerGlobalInfo = $infoSpriter.player;
        $gamePlayer._spriter._skin = args[0];
        playerGlobalInfo._skin = args[0];
    }
    else if (command === "playerSpeed") {
        const playerGlobalInfo = $infoSpriter.player;
        $gamePlayer._spriter._speed = args[0];
        playerGlobalInfo._speed = Number(args[0]);
    }
    else if (command === "playerStop") {
        const playerGlobalInfo = $infoSpriter.player;
        $gamePlayer._spriter._stop = eval(args[0]);
        playerGlobalInfo._stop = eval(args[0]);
    }
    else if (command === "playerRecovery") {
        const playerGlobalInfo = $infoSpriter.player;
        $gamePlayer._spriter._recovery = args[0];
        playerGlobalInfo._recovery = args[0];
    }
    else if (command === "playerSkinPart") {
        $gamePlayer.changeSkinPart(args[0], args[1], args[2]);
    }
    else if (command === "playerRemoveSkinPart") {
        $gamePlayer.removeSkinPart(args[0]);
    }
    else if (command === "playerChildSprite") {
        $gamePlayer.createChildSprite(args[0], args[1]);
    }
    else if (command === "playerRemoveChildSprite") {
        $gamePlayer.removeChildSprite(args[0]);
    }

    //-------------------------------------------------------------------------------------------------------------     
    // Follower
    //-------------------------------------------------------------------------------------------------------------     

    if (command === "followerSkeleton") {
        const follower = $gamePlayer.followers()._data[Number(args[0]) - 1]._spriter;
        follower.forceUpdate = true;
        const followerGlobalInfo = $infoSpriter.followers['follower_' + args[0]];
        follower._skeleton = args[1];
        followerGlobalInfo._skeleton = follower._skeleton;
        follower._skin = args[2];
        follower._skinParts = [];
        followerGlobalInfo._skin = follower._skin;
        followerGlobalInfo._skinParts = [];
    }
    else if (command === "followerSkin") {
        const follower = $gamePlayer.followers()._data[Number(args[0]) - 1]._spriter;
        follower.forceUpdate = true;
        const followerGlobalInfo = $infoSpriter.followers['follower_' + args[0]];
        follower._skin = args[1];
        follower._skinParts = [];
        followerGlobalInfo._skin = follower._skin;
        followerGlobalInfo._skinParts = [];
    }
    else if (command === "followerSpeed") {
        const follower = $gamePlayer.followers()._data[Number(args[0]) - 1]._spriter;
        const followerGlobalInfo = $infoSpriter.followers['follower_' + args[0] - 1];
        follower._speed = Number(args[1]);
        followerGlobalInfo._speed = follower._speed;
    }
    else if (command === "followerStop") {
        const follower = $gamePlayer.followers()._data[Number(args[0]) - 1]._spriter;
        const followerGlobalInfo = $infoSpriter.followers['follower_' + args[0]];
        follower._stop = eval(args[1]);
        followerGlobalInfo._stop = follower._stop;
    }
    else if (command === "followerRecovery") {
        const follower = $gamePlayer.followers()._data[Number(args[0]) - 1]._spriter;
        const followerGlobalInfo = $infoSpriter.followers['follower_' + args[0]];
        follower._recovery = args[1];
        followerGlobalInfo._recovery = follower._recovery;
    }
    else if (command === "followerSkinPart") {
        $gamePlayer.followers()._data[Number(args[0]) - 1].changeSkinPart(args[1], args[2], args[3]);
    }
    else if (command === "followerRemoveSkinPart") {
        $gamePlayer.followers()._data[Number(args[0]) - 1].removeSkinPart(args[1]);
    }
    else if (command === "followerChildSprite") {
        $gamePlayer.followers()._data[Number(args[0]) - 1].createChildSprite(args[1], args[2]);
    }
    else if (command === "followerRemoveChildSprite") {
        $gamePlayer.followers()._data[Number(args[0]) - 1].removeChildSprite(args[1]);
    }
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Pixi Layers
//*************************************************************************************************************
// Courtesy of ivan.popelyshev
// https://github.com/pixijs/pixi-display/tree/layers
//-------------------------------------------------------------------------------------------------------------

var pixi_display;
(function (pixi_display) {
    Object.assign(PIXI.Container.prototype, {
        render: function (renderer) {
            if (this._activeParentLayer && this._activeParentLayer != renderer._activeLayer) {
                return;
            }
            if (!this.visible) {
                this.displayOrder = 0;
                return;
            }
            this.displayOrder = renderer.incDisplayOrder();
            if (this.worldAlpha <= 0 || !this.renderable) {
                return;
            }
            renderer._activeLayer = null;
            this.containerRenderWebGL(renderer);
            renderer._activeLayer = this._activeParentLayer;
        },
        renderCanvas: function (renderer) {
            if (this._activeParentLayer && this._activeParentLayer != renderer._activeLayer) {
                return;
            }
            if (!this.visible) {
                this.displayOrder = 0;
                return;
            }
            this.displayOrder = renderer.incDisplayOrder();
            if (this.worldAlpha <= 0 || !this.renderable) {
                return;
            }
            renderer._activeLayer = null;
            this.containerRenderCanvas(renderer);
            renderer._activeLayer = this._activeParentLayer;
        },
        containerRenderWebGL: PIXI.Container.prototype.render,
        containerRenderCanvas: PIXI.Container.prototype.renderCanvas
    });
})(pixi_display || (pixi_display = {}));
Object.assign(PIXI.DisplayObject.prototype, {
    parentLayer: null,
    _activeParentLayer: null,
    parentGroup: null,
    zOrder: 0,
    zIndex: 0,
    updateOrder: 0,
    displayOrder: 0,
    layerableChildren: true,
    isLayer: false
});
if (PIXI.ParticleContainer) {
    PIXI.ParticleContainer.prototype.layerableChildren = false;
}
else if (PIXI.ParticleContainer) {
    PIXI.ParticleContainer.prototype.layerableChildren = false;
}
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (let p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pixi_display;
(function (pixi_display) {
    var utils = PIXI.utils;
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group(zIndex, sorting) {
            var _this = _super.call(this) || this;
            _this._activeLayer = null;
            _this._activeStage = null;
            _this._activeChildren = [];
            _this._lastUpdateId = -1;
            _this.useRenderTexture = false;
            _this.useDoubleBuffer = false;
            _this.sortPriority = 0;
            _this.clearColor = new Float32Array([0, 0, 0, 0]);
            _this.canDrawWithoutLayer = false;
            _this.canDrawInParentStage = true;
            _this.zIndex = 0;
            _this.enableSort = false;
            _this._tempResult = [];
            _this._tempZero = [];
            _this.useZeroOptimization = false;
            _this.zIndex = zIndex;
            _this.enableSort = !!sorting;
            if (typeof sorting === 'function') {
                _this.on('sort', sorting);
            }
            return _this;
        }
        Group.prototype.doSort = function (layer, sorted) {
            if (this.listeners('sort', true)) {
                for (let i = 0; i < sorted.length; i++) {
                    this.emit('sort', sorted[i]);
                }
            }
            if (this.useZeroOptimization) {
                this.doSortWithZeroOptimization(layer, sorted);
            }
            else {
                sorted.sort(Group.compareZIndex);
            }
        };
        Group.compareZIndex = function (a, b) {
            if (a.zOrder < b.zOrder) {
                return -1;
            }
            if (a.zOrder > b.zOrder) {
                return 1;
            }
            return a.updateOrder - b.updateOrder;
        };
        Group.prototype.doSortWithZeroOptimization = function (layer, sorted) {
            throw new Error("not implemented yet");
        };
        Group.prototype.clear = function () {
            this._activeLayer = null;
            this._activeStage = null;
            this._activeChildren.length = 0;
        };
        Group.prototype.addDisplayObject = function (stage, displayObject) {
            this.check(stage);
            displayObject._activeParentLayer = this._activeLayer;
            if (this._activeLayer) {
                this._activeLayer._activeChildren.push(displayObject);
            }
            else {
                this._activeChildren.push(displayObject);
            }
        };
        Group.prototype.foundLayer = function (stage, layer) {
            this.check(stage);
            if (this._activeLayer != null) {
                Group.conflict();
            }
            this._activeLayer = layer;
            this._activeStage = stage;
        };
        Group.prototype.foundStage = function (stage) {
            if (!this._activeLayer && !this.canDrawInParentStage) {
                this.clear();
            }
        };
        Group.prototype.check = function (stage) {
            if (this._lastUpdateId < Group._layerUpdateId) {
                this._lastUpdateId = Group._layerUpdateId;
                this.clear();
                this._activeStage = stage;
            }
            else if (this.canDrawInParentStage) {
                var current = this._activeStage;
                while (current && current != stage) {
                    current = current._activeParentStage;
                }
                this._activeStage = current;
                if (current == null) {
                    this.clear();
                    return;
                }
            }
        };
        Group.conflict = function () {
            if (Group._lastLayerConflict + 5000 < Date.now()) {
                Group._lastLayerConflict = Date.now();
                console.log("PIXI-display plugin found two layers with the same group in one stage - that's not healthy. Please place a breakpoint here and debug it");
            }
        };
        Group._layerUpdateId = 0;
        Group._lastLayerConflict = 0;
        return Group;
    }(utils.EventEmitter));
    pixi_display.Group = Group;
})(pixi_display || (pixi_display = {}));
var pixi_display;
(function (pixi_display) {
    function processInteractive51(strangeStuff, displayObject, func, hitTest, interactive) {
        if (!this.search) {
            this.search = new pixi_display.LayersTreeSearch();
        }
        this.search.findHit(strangeStuff, displayObject, func, hitTest);
        var delayedEvents = this.delayedEvents;
        if (delayedEvents && delayedEvents.length) {
            strangeStuff.stopPropagationHint = false;
            var delayedLen = delayedEvents.length;
            this.delayedEvents = [];
            for (let i = 0; i < delayedLen; i++) {
                var _a = delayedEvents[i], displayObject_1 = _a.displayObject, eventString = _a.eventString, eventData = _a.eventData;
                if (eventData.stopsPropagatingAt === displayObject_1) {
                    eventData.stopPropagationHint = true;
                }
                this.dispatchEvent(displayObject_1, eventString, eventData);
            }
        }
    }
    pixi_display.processInteractive51 = processInteractive51;
    function patchInteractionManager(interactionManager) {
        if (!interactionManager) {
            return;
        }
        if (interactionManager.search) {
            if (!interactionManager.search.worksWithDisplay) {
                interactionManager.search = new pixi_display.LayersTreeSearch();
            }
        }
        else {
            interactionManager.processInteractive = processInteractive51;
        }
    }
    pixi_display.patchInteractionManager = patchInteractionManager;
})(pixi_display || (pixi_display = {}));
var pixi_display;
(function (pixi_display) {
    var LayerTextureCache = (function () {
        function LayerTextureCache(layer) {
            this.layer = layer;
            this.renderTexture = null;
            this.doubleBuffer = null;
            this.currentBufferIndex = 0;
            this._tempRenderTarget = null;
            this._tempRenderTargetSource = new PIXI.Rectangle();
        }
        LayerTextureCache.prototype.initRenderTexture = function (renderer) {
            var width = renderer ? renderer.screen.width : 100;
            var height = renderer ? renderer.screen.height : 100;
            var resolution = renderer ? renderer.resolution : PIXI.settings.RESOLUTION;
            this.renderTexture = PIXI.RenderTexture.create({ width: width, height: height, resolution: resolution });
            if (this.layer.group.useDoubleBuffer) {
                this.doubleBuffer = [
                    PIXI.RenderTexture.create({ width: width, height: height, resolution: resolution }),
                    PIXI.RenderTexture.create({ width: width, height: height, resolution: resolution })
                ];
            }
        };
        LayerTextureCache.prototype.getRenderTexture = function () {
            if (!this.renderTexture) {
                this.initRenderTexture();
            }
            return this.renderTexture;
        };
        LayerTextureCache.prototype.pushTexture = function (renderer) {
            var screen = renderer.screen;
            if (!this.renderTexture) {
                this.initRenderTexture(renderer);
            }
            var rt = this.renderTexture;
            var group = this.layer.group;
            var db = this.doubleBuffer;
            if (rt.width !== screen.width ||
                rt.height !== screen.height ||
                rt.baseTexture.resolution !== renderer.resolution) {
                rt.baseTexture.resolution = renderer.resolution;
                rt.resize(screen.width, screen.height);
                if (db) {
                    db[0].baseTexture.resolution = renderer.resolution;
                    db[0].resize(screen.width, screen.height);
                    db[1].baseTexture.resolution = renderer.resolution;
                    db[1].resize(screen.width, screen.height);
                }
            }
            this._tempRenderTarget = renderer.renderTexture.current;
            this._tempRenderTargetSource.copyFrom(renderer.renderTexture.sourceFrame);
            renderer.batch.flush();
            if (group.useDoubleBuffer) {
                var buffer = db[this.currentBufferIndex];
                if (!buffer.baseTexture._glTextures[renderer.CONTEXT_UID]) {
                    renderer.renderTexture.bind(buffer, undefined, undefined);
                    renderer.texture.bind(buffer);
                    if (group.clearColor) {
                        renderer.renderTexture.clear(group.clearColor);
                    }
                }
                renderer.texture.unbind(rt.baseTexture);
                rt.baseTexture._glTextures = buffer.baseTexture._glTextures;
                rt.baseTexture.framebuffer = buffer.baseTexture.framebuffer;
                buffer = db[1 - this.currentBufferIndex];
                renderer.renderTexture.bind(buffer, undefined, undefined);
            }
            else {
                renderer.renderTexture.bind(rt, undefined, undefined);
            }
            if (group.clearColor) {
                renderer.renderTexture.clear(group.clearColor);
            }
            var filterStack = renderer.filter.defaultFilterStack;
            if (filterStack.length > 1) {
                filterStack[filterStack.length - 1].renderTexture = renderer.renderTexture.current;
            }
        };
        LayerTextureCache.prototype.popTexture = function (renderer) {
            renderer.batch.flush();
            var filterStack = renderer.filter.defaultFilterStack;
            if (filterStack.length > 1) {
                filterStack[filterStack.length - 1].renderTexture = this._tempRenderTarget;
            }
            renderer.renderTexture.bind(this._tempRenderTarget, this._tempRenderTargetSource, undefined);
            this._tempRenderTarget = null;
            var rt = this.renderTexture;
            var group = this.layer.group;
            var db = this.doubleBuffer;
            if (group.useDoubleBuffer) {
                renderer.texture.unbind(rt.baseTexture);
                this.currentBufferIndex = 1 - this.currentBufferIndex;
                var buffer = db[this.currentBufferIndex];
                rt.baseTexture._glTextures = buffer.baseTexture._glTextures;
                rt.baseTexture.framebuffer = buffer.baseTexture.framebuffer;
            }
        };
        LayerTextureCache.prototype.destroy = function () {
            if (this.renderTexture) {
                this.renderTexture.destroy();
                if (this.doubleBuffer) {
                    this.doubleBuffer[0].destroy(true);
                    this.doubleBuffer[1].destroy(true);
                }
            }
        };
        return LayerTextureCache;
    }());
    pixi_display.LayerTextureCache = LayerTextureCache;
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer(group) {
            if (group === void 0) { group = null; }
            var _this = _super.call(this) || this;
            _this.isLayer = true;
            _this.group = null;
            _this._activeChildren = [];
            _this._tempChildren = null;
            _this._activeStageParent = null;
            _this._sortedChildren = [];
            _this._tempLayerParent = null;
            _this.insertChildrenBeforeActive = true;
            _this.insertChildrenAfterActive = true;
            if (group != null) {
                _this.group = group;
                _this.zIndex = group.zIndex;
            }
            else {
                _this.group = new pixi_display.Group(0, false);
            }
            _this._tempChildren = _this.children;
            return _this;
        }
        Layer.prototype.beginWork = function (stage) {
            var active = this._activeChildren;
            this._activeStageParent = stage;
            this.group.foundLayer(stage, this);
            var groupChildren = this.group._activeChildren;
            active.length = 0;
            for (let i = 0; i < groupChildren.length; i++) {
                groupChildren[i]._activeParentLayer = this;
                active.push(groupChildren[i]);
            }
            groupChildren.length = 0;
        };
        Layer.prototype.endWork = function () {
            var children = this.children;
            var active = this._activeChildren;
            var sorted = this._sortedChildren;
            for (let i = 0; i < active.length; i++) {
                this.emit("display", active[i]);
            }
            sorted.length = 0;
            if (this.insertChildrenBeforeActive) {
                for (let i = 0; i < children.length; i++) {
                    sorted.push(children[i]);
                }
            }
            for (let i = 0; i < active.length; i++) {
                sorted.push(active[i]);
            }
            if (!this.insertChildrenBeforeActive &&
                this.insertChildrenAfterActive) {
                for (let i = 0; i < children.length; i++) {
                    sorted.push(children[i]);
                }
            }
            if (this.group.enableSort) {
                this.doSort();
            }
        };
        Object.defineProperty(Layer.prototype, "useRenderTexture", {
            get: function () {
                return this.group.useRenderTexture;
            },
            set: function (value) {
                this.group.useRenderTexture = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "useDoubleBuffer", {
            get: function () {
                return this.group.useDoubleBuffer;
            },
            set: function (value) {
                this.group.useDoubleBuffer = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "clearColor", {
            get: function () {
                return this.group.clearColor;
            },
            set: function (value) {
                this.group.clearColor = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "sortPriority", {
            get: function () {
                return this.group.sortPriority;
            },
            set: function (value) {
                this.group.sortPriority = value;
            },
            enumerable: false,
            configurable: true
        });
        Layer.prototype.getRenderTexture = function () {
            if (!this.textureCache) {
                this.textureCache = new LayerTextureCache(this);
            }
            return this.textureCache.getRenderTexture();
        };
        Layer.prototype.updateDisplayLayers = function () {
        };
        Layer.prototype.doSort = function () {
            this.group.doSort(this, this._sortedChildren);
        };
        Layer.prototype._preRender = function (renderer) {
            if (this._activeParentLayer && this._activeParentLayer != renderer._activeLayer) {
                return false;
            }
            if (!this.visible) {
                this.displayOrder = 0;
                return false;
            }
            this.displayOrder = renderer.incDisplayOrder();
            if (this.worldAlpha <= 0 || !this.renderable) {
                return false;
            }
            if (this.children !== this._sortedChildren &&
                this._tempChildren != this.children) {
                this._tempChildren = this.children;
            }
            this._boundsID++;
            this.children = this._sortedChildren;
            this._tempLayerParent = renderer._activeLayer;
            renderer._activeLayer = this;
            return true;
        };
        Layer.prototype._postRender = function (renderer) {
            this.children = this._tempChildren;
            renderer._activeLayer = this._tempLayerParent;
            this._tempLayerParent = null;
        };
        Layer.prototype.render = function (renderer) {
            if (!this._preRender(renderer)) {
                return;
            }
            if (this.group.useRenderTexture) {
                if (!this.textureCache) {
                    this.textureCache = new LayerTextureCache(this);
                }
                this.textureCache.pushTexture(renderer);
            }
            this.containerRenderWebGL(renderer);
            this._postRender(renderer);
            if (this.group.useRenderTexture) {
                this.textureCache.popTexture(renderer);
            }
        };
        Layer.prototype.destroy = function (options) {
            if (this.textureCache) {
                this.textureCache.destroy();
                this.textureCache = null;
            }
            _super.prototype.destroy.call(this, options);
        };
        return Layer;
    }(PIXI.Container));
    pixi_display.Layer = Layer;
    Layer.prototype.renderCanvas = function (renderer) {
        if (this._preRender(renderer)) {
            this.containerRenderCanvas(renderer);
            this._postRender(renderer);
        }
    };
})(pixi_display || (pixi_display = {}));
var pixi_display;
(function (pixi_display) {
    var Point = PIXI.Point;
    var LayersTreeSearch = (function () {
        function LayersTreeSearch() {
            this._tempPoint = new Point();
            this._queue = [[], []];
            this._eventDisplayOrder = 0;
            this.worksWithDisplay = true;
        }
        LayersTreeSearch.prototype.recursiveFindHit = function (point, displayObject, hitTestOrder, interactive, outOfMask) {
            if (!displayObject || !displayObject.visible) {
                return 0;
            }
            var hit = 0, interactiveParent = interactive = displayObject.interactive || interactive;
            if (displayObject.hitArea) {
                interactiveParent = false;
            }
            if (displayObject._activeParentLayer) {
                outOfMask = false;
            }
            var mask = displayObject._mask;
            if (hitTestOrder < Infinity && mask) {
                if (!mask.containsPoint(point)) {
                    outOfMask = true;
                }
            }
            if (hitTestOrder < Infinity && displayObject.filterArea) {
                if (!displayObject.filterArea.contains(point.x, point.y)) {
                    outOfMask = true;
                }
            }
            var children = displayObject.children;
            if (displayObject.interactiveChildren && children) {
                for (let i = children.length - 1; i >= 0; i--) {
                    var child = children[i];
                    var hitChild = this.recursiveFindHit(point, child, hitTestOrder, interactiveParent, outOfMask);
                    if (hitChild) {
                        if (!child.parent) {
                            continue;
                        }
                        hit = hitChild;
                        hitTestOrder = hitChild;
                    }
                }
            }
            if (interactive) {
                if (!outOfMask) {
                    if (hitTestOrder < displayObject.displayOrder) {
                        if (displayObject.hitArea) {
                            displayObject.worldTransform.applyInverse(point, this._tempPoint);
                            if (displayObject.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) {
                                hit = displayObject.displayOrder;
                            }
                        }
                        else if (displayObject.containsPoint) {
                            if (displayObject.containsPoint(point)) {
                                hit = displayObject.displayOrder;
                            }
                        }
                    }
                    if (displayObject.interactive) {
                        this._queueAdd(displayObject, hit === Infinity ? 0 : hit);
                    }
                }
                else {
                    if (displayObject.interactive) {
                        this._queueAdd(displayObject, 0);
                    }
                }
            }
            return hit;
        };
        LayersTreeSearch.prototype.findHit = function (strangeStuff, displayObject, func, hitTest) {
            var interactionEvent = null;
            var point = null;
            if (strangeStuff.data &&
                strangeStuff.data.global) {
                interactionEvent = strangeStuff;
                point = interactionEvent.data.global;
            }
            else {
                point = strangeStuff;
            }
            this._startInteractionProcess();
            this.recursiveFindHit(point, displayObject, hitTest ? 0 : Infinity, false, false);
            this._finishInteractionProcess(interactionEvent, func);
        };
        LayersTreeSearch.prototype._startInteractionProcess = function () {
            this._eventDisplayOrder = 1;
            if (!this._queue) {
                this._queue = [[], []];
            }
            this._queue[0].length = 0;
            this._queue[1].length = 0;
        };
        LayersTreeSearch.prototype._queueAdd = function (displayObject, order) {
            var queue = this._queue;
            if (order < this._eventDisplayOrder) {
                queue[0].push(displayObject);
            }
            else {
                if (order > this._eventDisplayOrder) {
                    this._eventDisplayOrder = order;
                    var q = queue[1];
                    for (let i = 0, l = q.length; i < l; i++) {
                        queue[0].push(q[i]);
                    }
                    queue[1].length = 0;
                }
                queue[1].push(displayObject);
            }
        };
        LayersTreeSearch.prototype._finishInteractionProcess = function (event, func) {
            var queue = this._queue;
            var q = queue[0];
            for (let i = 0, l = q.length; i < l; i++) {
                if (event) {
                    if (func) {
                        func(event, q[i], false);
                    }
                }
                else {
                    func(q[i], false);
                }
            }
            q = queue[1];
            for (let i = 0, l = q.length; i < l; i++) {
                if (event) {
                    if (!event.target) {
                        event.target = q[i];
                    }
                    if (func) {
                        func(event, q[i], true);
                    }
                }
                else {
                    func(q[i], true);
                }
            }
        };
        return LayersTreeSearch;
    }());
    pixi_display.LayersTreeSearch = LayersTreeSearch;
})(pixi_display || (pixi_display = {}));
var pixi_display;
(function (pixi_display) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            var _this = _super.call(this) || this;
            _this.isStage = true;
            _this._tempGroups = [];
            _this._activeLayers = [];
            _this._activeParentStage = null;
            return _this;
        }
        Stage.prototype.clear = function () {
            this._activeLayers.length = 0;
            this._tempGroups.length = 0;
        };
        Stage.prototype.destroy = function (options) {
            this.clear();
            _super.prototype.destroy.call(this, options);
        };
        Stage.prototype._addRecursive = function (displayObject) {
            if (!displayObject.visible) {
                return;
            }
            if (displayObject.isLayer) {
                var layer_1 = displayObject;
                this._activeLayers.push(layer_1);
                layer_1.beginWork(this);
            }
            if (displayObject != this && displayObject.isStage) {
                var stage = displayObject;
                stage.updateAsChildStage(this);
                return;
            }
            var group = displayObject.parentGroup;
            if (group != null) {
                group.addDisplayObject(this, displayObject);
            }
            var layer = displayObject.parentLayer;
            if (layer != null) {
                group = layer.group;
                group.addDisplayObject(this, displayObject);
            }
            displayObject.updateOrder = ++Stage._updateOrderCounter;
            if (displayObject.alpha <= 0 || !displayObject.renderable
                || !displayObject.layerableChildren
                || group && group.sortPriority) {
                return;
            }
            var children = displayObject.children;
            if (children && children.length) {
                for (let i = 0; i < children.length; i++) {
                    this._addRecursive(children[i]);
                }
            }
        };
        Stage.prototype._addRecursiveChildren = function (displayObject) {
            if (displayObject.alpha <= 0 || !displayObject.renderable
                || !displayObject.layerableChildren) {
                return;
            }
            var children = displayObject.children;
            if (children && children.length) {
                for (let i = 0; i < children.length; i++) {
                    this._addRecursive(children[i]);
                }
            }
        };
        Stage.prototype._updateStageInner = function () {
            this.clear();
            this._addRecursive(this);
            var layers = this._activeLayers;
            for (let i = 0; i < layers.length; i++) {
                var layer = layers[i];
                if (layer.group.sortPriority) {
                    layer.endWork();
                    var sorted = layer._sortedChildren;
                    for (let j = 0; j < sorted.length; j++) {
                        this._addRecursiveChildren(sorted[j]);
                    }
                }
            }
            for (let i = 0; i < layers.length; i++) {
                var layer = layers[i];
                if (!layer.group.sortPriority) {
                    layer.endWork();
                }
            }
        };
        Stage.prototype.updateAsChildStage = function (stage) {
            this._activeParentStage = stage;
            Stage._updateOrderCounter = 0;
            this._updateStageInner();
        };
        Stage.prototype.updateStage = function () {
            this._activeParentStage = null;
            pixi_display.Group._layerUpdateId++;
            this._updateStageInner();
        };
        ;
        Stage._updateOrderCounter = 0;
        return Stage;
    }(pixi_display.Layer));
    pixi_display.Stage = Stage;
})(pixi_display || (pixi_display = {}));
var pixi_display;
(function (pixi_display) {
    Object.assign(PIXI.Renderer.prototype, {
        _lastDisplayOrder: 0,
        _activeLayer: null,
        incDisplayOrder: function () {
            return ++this._lastDisplayOrder;
        },
        _oldRender: PIXI.Renderer.prototype.render,
        render: function (displayObject, renderTexture, clear, transform, skipUpdateTransform) {
            if (!renderTexture) {
                this._lastDisplayOrder = 0;
            }
            this._activeLayer = null;
            if (displayObject.isStage) {
                displayObject.updateStage();
            }
            pixi_display.patchInteractionManager(this.plugins.interaction);
            this._oldRender(displayObject, renderTexture, clear, transform, skipUpdateTransform);
        }
    });
    var canvasRenderer = PIXI.CanvasRenderer;
    if (canvasRenderer) {
        Object.assign(canvasRenderer.prototype, {
            _lastDisplayOrder: 0,
            _activeLayer: null,
            incDisplayOrder: function () {
                return ++this._lastDisplayOrder;
            },
            _oldRender: canvasRenderer.prototype.render,
            render: function (displayObject, renderTexture, clear, transform, skipUpdateTransform) {
                if (!renderTexture) {
                    this._lastDisplayOrder = 0;
                }
                this._activeLayer = null;
                if (displayObject.isStage) {
                    displayObject.updateStage();
                }
                pixi_display.patchInteractionManager(this.plugins.interaction);
                this._oldRender(displayObject, renderTexture, clear, transform, skipUpdateTransform);
            }
        });
    }
})(pixi_display || (pixi_display = {}));
var pixi_display;
(function (pixi_display) {
    PIXI.display = pixi_display;
})(pixi_display || (pixi_display = {}));
//# sourceMappingURL=pixi-layers.js.map

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Implementing pixi-layers
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

const oldGraphicsRender = Graphics.render;
Graphics.render = function (stage) {
    if (!this._realStage) {
        this._realStage = new PIXI.display.Stage();
    }

    if (stage.parent !== this._realStage) {
        this._realStage.removeChildren();
        this._realStage.addChild(stage);
    }

    oldGraphicsRender.call(Graphics, this._realStage);
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Fix For SubFolders for RPGV 1.6
// Unnecessary for new version of Spriter.js whoch works with textures instead of bitmaps.
// 
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

// ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
//     if (filename) {
//         const folderPath = filename.split('/');
//         for (let i = 0; i < folderPath.length - 1; i++) {
//             folder += folderPath[i] + '/';
//         }
//         filename = folderPath[folderPath.length - 1];
//         const path = folder + encodeURIComponent(filename) + '.png';
//         const bitmap = this.loadNormalBitmap(path, hue || 0);
//         bitmap.smooth = smooth;
//         return bitmap;
//     } else {
//         return this.loadEmptyBitmap();
//     }
// };

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Recreation of the CSS3 transition Bezier
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

/**
* Solver for cubic bezier curve with implicit control points at (0,0) and (1.0, 1.0)
*/
function UnitBezier(p1x, p1y, p2x, p2y) {
    // pre-calculate the polynomial coefficients
    // First and last control points are implied to be (0,0) and (1.0, 1.0)
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx - this.bx;

    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;
}

UnitBezier.prototype.epsilon = 1e-6; // Precision  
UnitBezier.prototype.sampleCurveX = function (t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
}
UnitBezier.prototype.sampleCurveY = function (t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
}
UnitBezier.prototype.sampleCurveDerivativeX = function (t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
}


UnitBezier.prototype.solveCurveX = function (x, epsilon) {
    let t0;
    let t1;
    let t2 = x;
    let x2;
    let d2;

    // First try a few iterations of Newton's method -- normally very fast.
    for (let i = 0; i < 8; i++) {
        x2 = this.sampleCurveX(t2) - x;
        if (Math.abs(x2) < epsilon)
            return t2;
        d2 = this.sampleCurveDerivativeX(t2);
        if (Math.abs(d2) < epsilon)
            break;
        t2 = t2 - x2 / d2;
    }

    // No solution found - use bi-section
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
        x2 = this.sampleCurveX(t2);
        if (Math.abs(x2 - x) < epsilon)
            return t2;
        if (x > x2) t0 = t2;
        else t1 = t2;

        t2 = (t1 - t0) * .5 + t0;
    }

    // Give up
    return t2;
}

// Find new T as a function of Y along curve X
UnitBezier.prototype.solve = function (x, epsilon) {
    return this.sampleCurveY(this.solveCurveX(x, epsilon));
}

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Game_SpriterCharacter
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

function Game_SpriterCharacter() {
    this.initialize.apply(this, arguments);
}

Object.defineProperties(Game_SpriterCharacter.prototype, {
    x: { get: function () { return this._x; }, configurable: true },
    y: { get: function () { return this._y; }, configurable: true }
});

Game_SpriterCharacter.prototype.initialize = function (content, spriteParent, id) {
    this.initMembers(content, spriteParent, id);
};

Game_SpriterCharacter.prototype.initMembers = function (content, spriteParent, id) {
    this.x = 0;
    this.y = 0;
    this._spriter = content._spriter;
    this._spriter._spriteRequests = [];
    this._spriter._spriteRemoveRequests = [];
    this._direction = content._direction;
    this._stepAnime = content._stepAnime;
    this._id = id;
    this._name = content._name;
    this._spriteParent = spriteParent;
};

//-------------------------------------------------------------------------------------------------------------
//*************************************************************************************************************
// Variable for Spriter Data
//*************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------

var $infoSpriter = null;
var $spriteRequestManager = null;

const spriter_alias_Datamanager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
    const contents = spriter_alias_Datamanager_makeSaveContents.call(this);
    contents.spriter = $infoSpriter;
    return contents;
};

const spriter_alias_Datamanager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
    spriter_alias_Datamanager_createGameObjects.call(this);
    $infoSpriter = new SpriterData();
    $spriteRequestManager = new SpriteRequestManager();
};

const spriter_alias_Datamanager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
    spriter_alias_Datamanager_extractSaveContents.call(this, contents);
    $infoSpriter = contents.spriter;
};

function SpriterData() {
    this.initialize.apply(this, arguments);
}

SpriterData.prototype.initialize = function () {
    this.player = {};
    this.player.tag = [];
    this.player.var = {};
    this.player._children = [];
    this.followers = {};
    this.followers._children = [];
    this.maps = {};
    this._followerRequests = [];
    this._eventRequests = [];

    for (let i = 1; i < $dataActors.length; i++) {
        this.followers["follower_" + $dataActors[i].id] = {};
        this.followers["follower_" + $dataActors[i].id].tag = [];
        this.followers["follower_" + $dataActors[i].id].var = {};
    }

    for (let i = 1; i < $dataMapInfos.length; i++) {
        if ($dataMapInfos[i] !== null) {
            this.maps["map_" + i] = {};
        }
    }
};

function SpriteRequestManager() {
    this.initialize.apply(this, arguments);
}

SpriteRequestManager.prototype.initialize = function () {
    this._childSprites = [];
    this._spriteRequests = [];
};

function Spriter_Animation() {
    this.initialize.apply(this, arguments);
}

Spriter_Animation.prototype = Object.create(Sprite.prototype);
Spriter_Animation.prototype.constructor = Sprite_Animation;
