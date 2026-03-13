(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Ge={chunkSizeX:16,chunkSizeY:96,chunkSizeZ:16,preloadRadius:4,maxInteractionDistance:6,generationBudgetPerFrame:1,meshBudgetPerFrame:1,skyColor:"#9cc7f5"},Le={walkSpeed:4.45,sprintSpeed:6.25,crouchSpeed:1.72,jumpVelocity:7.2,gravity:24,colliderWidth:.6,colliderHeight:1.8,eyeHeight:1.62,crouchEyeHeight:1.15,mouseSensitivity:.0025,jumpRepeatDelayMs:86,landingJumpCooldownMs:54,autoJumpGroundedDelayMs:18,jumpBufferMs:95,coyoteTimeMs:80,groundFrictionTick:.56,airFrictionTick:.92,verticalDragTick:.984,groundWalkAccelerationTick:.11,groundSprintAccelerationTick:.17,groundCrouchAccelerationTick:.05,airWalkAccelerationTick:.022,airSprintAccelerationTick:.03,airStrafePenalty:.55,airSprintSideControlPenalty:.9,groundSprintForwardStrafeScale:.62,airSprintForwardStrafeScale:.76,fallStrafeBaseControlSpeed:2.35,airborneWalkSpeed:5.1,airborneSprintSpeed:6.55,sprintJumpBoost:.28,landingProbeSeconds:.09,landingApproachDamping:.74,maxHorizontalSpeed:7.25,mcTickSeconds:.05},pt={schemaVersion:5,databaseVersion:3,legacyWorldId:"default-world",appMetaKey:"app-meta",playerSaveIntervalMs:2e3,worldSaveDebounceMs:500},xc={languages:{fr:"Francais",en:"Anglais"},menu:{homeWardrobe:"Vestiaire",homeSolo:"Solo",homeMultiplayerSoon:"Multijoueur (bientot)",homeStats:"Stats",homeSettings:"Parametres",singleplayerTitle:"Selection du monde",play:"Jouer",createWorld:"Creer un monde",edit:"Modifier",delete:"Supprimer",back:"Retour",createWorldTitle:"Creation de monde",worldNameLabel:"Nom du monde",worldNamePlaceholder:"Nouveau monde",worldSeedLabel:"Seed du generateur",worldSeedPlaceholder:"Laisse vide pour une seed aleatoire",createWorldAction:"Creer le monde",editWorldTitle:"Edition du monde",save:"Sauvegarder",settingsTitle:"Parametres",keyBindings:"Assignation des touches",graphics:"Options graphiques",language:"Langue",languagesTitle:"Langues",graphicsTitle:"Options graphiques",fullscreen:"Plein ecran",interfaceSize:"Taille interface",stateOn:"ON",stateOff:"OFF",keybindingsTitle:"Touches",resetDefaults:"Reinitialiser",pressKey:"Appuyer sur une touche...",statsTitle:"Statistiques globales",statsGeneralTab:"General",statsItemsTab:"Objets",pauseBackToGame:"Retour au jeu",pauseSettings:"Parametres",pauseQuit:"Quitter la partie",pauseSeed:"Seed {seed}",pauseDefaultWorldName:"Jeu en pause",pauseNotAvailable:"N/A",wardrobeTitle:"Vestiaire",validate:"Valider",import:"Importer",noCategory:"Aucune categorie",noCategoryDot:"Aucune categorie.",noSkinDot:"Aucun skin.",defaultSkin:"Skin par defaut",importedSkin:"Skin importe",all:"TOUS",male:"HOMME",female:"FEMME",emptyWorlds:"Aucun monde.",noWorldSelected:"Aucun monde selectionne",deleteWorldConfirm:'Supprimer le monde "{world}" ?',worldCreatedAt:"Creation : {date}",worldLastPlayedAt:"Derniere partie : {date}",playTime:"Temps de jeu",distanceTravelled:"Distance parcourue",jumps:"Sauts",worldsCreated:"Mondes crees",blocksMined:"Blocs casses",blocksPlaced:"Blocs poses",craftedItems:"Objets craftes",worldsSaved:"Mondes sauvegardes",pauseBlocksMined:"Blocs casses",pauseBlocksPlaced:"Blocs poses",pauseDistance:"Distance"},inventory:{filterCraftable:"Craftable",filterAll:"Tous",storage:"Stockage",boardHint:"Clic gauche: echanger, clic droit: diviser, shift: transfert rapide.",hotbar:"Barre rapide",character:"Personnage",paperdoll:"Apercu joueur 3D",loadSkin:"Charger un skin (PNG 64x64)",equipment:"Equipement",equipmentNote:"Emplacements reserves pour armure/equipement futur.",soon:"Bientot",close:"Fermer",craftingTable:"Table de craft",inventory:"Inventaire",craftableOnTable:"{count} recette(s) disponibles sur la table.",craftableInInventory:"{count} recette(s) disponibles depuis l inventaire.",emptyCraftable:"Aucune recette craftable pour le moment.",emptyRecipes:"Aucune recette disponible dans ce mode.",cursorEmpty:"Curseur: vide",cursorValue:"Curseur: {count} x {name}"},hud:{generating:"Generation..."},controls:{unbound:"Non assigne",actions:{moveForward:"Avancer",moveBackward:"Reculer",moveLeft:"Deplacement gauche",moveRight:"Deplacement droite",jump:"Sauter",crouch:"S'accroupir",sprint:"Courir",inventory:"Inventaire",debug:"Overlay debug",pause:"Menu pause"},specialKeys:{Escape:"Esc",Space:"Espace",ControlLeft:"Ctrl Gauche",ControlRight:"Ctrl Droit",ShiftLeft:"Maj Gauche",ShiftRight:"Maj Droit",AltLeft:"Alt Gauche",AltRight:"Alt Droit",ArrowUp:"Fleche Haut",ArrowDown:"Fleche Bas",ArrowLeft:"Fleche Gauche",ArrowRight:"Fleche Droite",Numpad0:"Pave 0",Numpad1:"Pave 1",Numpad2:"Pave 2",Numpad3:"Pave 3",Numpad4:"Pave 4",Numpad5:"Pave 5",Numpad6:"Pave 6",Numpad7:"Pave 7",Numpad8:"Pave 8",Numpad9:"Pave 9"}},blocks:{air:"Air",grass:"Herbe",dirt:"Terre",stone:"Pierre",wood:"Buche",leaves:"Feuilles",bedrock:"Bedrock",planks:"Planches",crafting_table:"Table de craft",stone_bricks:"Briques de pierre",water:"Eau",sand:"Sable",clay:"Argile",mud:"Boue",grass_plant:"Hautes herbes",flower_red:"Fleur rouge"},recipes:{planks:{label:"Planches x4",description:"Transforme une buche en quatre planches."},crafting_table:{label:"Table de craft",description:"Quatre planches forment un etabli."},stone_bricks:{label:"Briques de pierre x4",description:"Recette d etabli pour une pierre plus propre."}}},Cd={languages:{fr:"French",en:"English"},menu:{homeWardrobe:"Wardrobe",homeSolo:"Singleplayer",homeMultiplayerSoon:"Multiplayer (soon)",homeStats:"Stats",homeSettings:"Settings",singleplayerTitle:"Select World",play:"Play",createWorld:"Create World",edit:"Edit",delete:"Delete",back:"Back",createWorldTitle:"Create New World",worldNameLabel:"World Name",worldNamePlaceholder:"New World",worldSeedLabel:"World Generator Seed",worldSeedPlaceholder:"Leave empty for a random seed",createWorldAction:"Create World",editWorldTitle:"Edit World",save:"Save",settingsTitle:"Settings",keyBindings:"Key Bindings",graphics:"Graphics",language:"Language",languagesTitle:"Languages",graphicsTitle:"Graphics Options",fullscreen:"Fullscreen",interfaceSize:"Interface Size",stateOn:"ON",stateOff:"OFF",keybindingsTitle:"Key Bindings",resetDefaults:"Reset Defaults",pressKey:"Press key...",statsTitle:"Global Stats",statsGeneralTab:"General",statsItemsTab:"Items",pauseBackToGame:"Back to Game",pauseSettings:"Settings",pauseQuit:"Quit Game",pauseSeed:"Seed {seed}",pauseDefaultWorldName:"Game Paused",pauseNotAvailable:"N/A",wardrobeTitle:"Wardrobe",validate:"Validate",import:"Import",noCategory:"No category",noCategoryDot:"No category.",noSkinDot:"No skin.",defaultSkin:"Default Skin",importedSkin:"Imported Skin",all:"ALL",male:"MALE",female:"FEMALE",emptyWorlds:"No worlds.",noWorldSelected:"No world selected",deleteWorldConfirm:'Delete world "{world}"?',worldCreatedAt:"Created: {date}",worldLastPlayedAt:"Last played: {date}",playTime:"Play Time",distanceTravelled:"Distance Travelled",jumps:"Jumps",worldsCreated:"Worlds Created",blocksMined:"Blocks Mined",blocksPlaced:"Blocks Placed",craftedItems:"Crafted Items",worldsSaved:"Worlds Saved",pauseBlocksMined:"Blocks Mined",pauseBlocksPlaced:"Blocks Placed",pauseDistance:"Distance"},inventory:{filterCraftable:"Craftable",filterAll:"All",storage:"Storage",boardHint:"Left click swap, right click split, shift click quick-move.",hotbar:"Hotbar",character:"Character",paperdoll:"3D player preview",loadSkin:"Load skin (64x64 PNG)",equipment:"Equipment",equipmentNote:"Reserved vertical slots for future armor/equipment.",soon:"Soon",close:"Close",craftingTable:"Crafting Table",inventory:"Inventory",craftableOnTable:"{count} recipe(s) available on the table.",craftableInInventory:"{count} recipe(s) available from the player inventory.",emptyCraftable:"Nothing craftable right now.",emptyRecipes:"No recipes available in this mode.",cursorEmpty:"Cursor: empty",cursorValue:"Cursor: {count} x {name}"},hud:{generating:"Generating..."},controls:{unbound:"Unbound",actions:{moveForward:"Move Forward",moveBackward:"Move Backward",moveLeft:"Strafe Left",moveRight:"Strafe Right",jump:"Jump",crouch:"Crouch",sprint:"Sprint",inventory:"Inventory",debug:"Debug Overlay",pause:"Pause Menu"},specialKeys:{Escape:"Esc",Space:"Space",ControlLeft:"Ctrl Left",ControlRight:"Ctrl Right",ShiftLeft:"Shift Left",ShiftRight:"Shift Right",AltLeft:"Alt Left",AltRight:"Alt Right",ArrowUp:"Arrow Up",ArrowDown:"Arrow Down",ArrowLeft:"Arrow Left",ArrowRight:"Arrow Right",Numpad0:"Num 0",Numpad1:"Num 1",Numpad2:"Num 2",Numpad3:"Num 3",Numpad4:"Num 4",Numpad5:"Num 5",Numpad6:"Num 6",Numpad7:"Num 7",Numpad8:"Num 8",Numpad9:"Num 9"}},blocks:{air:"Air",grass:"Grass",dirt:"Dirt",stone:"Stone",wood:"Log",leaves:"Leaves",bedrock:"Bedrock",planks:"Planks",crafting_table:"Crafting Table",stone_bricks:"Stone Bricks",water:"Water",sand:"Sand",clay:"Clay",mud:"Mud",grass_plant:"Tall Grass",flower_red:"Red Flower"},recipes:{planks:{label:"Planks x4",description:"Turn one log into four planks."},crafting_table:{label:"Crafting Table",description:"Four planks form a workbench."},stone_bricks:{label:"Stone Bricks x4",description:"Workbench recipe for a cleaner stone block."}}},ca={fr:xc,en:Cd},Pd=new Set(Object.keys(xc.controls.specialKeys)),Id=n=>Pd.has(n),da=Object.freeze(Object.keys(ca)),zn="fr",Ld=new Set(da);let ho=zn;const Dd=n=>typeof n=="string"&&Ld.has(n),wc=()=>ho,mr=n=>{ho=n},Go=(n,e)=>{const t=e.split(".");let i=n;for(const s of t){if(!i||typeof i!="object"||!(s in i))return null;i=i[s]}return typeof i=="string"?i:null},kd=(n,e={})=>{let t=n;return Object.entries(e).forEach(([i,s])=>{t=t.replace(new RegExp(`\\{${i}\\}`,"g"),String(s))}),t},Ft=(n,e={},t=ho)=>{const i=Go(ca[t],n)??Go(ca[zn],n);return i?kd(i,e):n},Ho=(n,e)=>Ft(`languages.${n}`,{},e),$s=["moveForward","moveBackward","moveLeft","moveRight","jump","crouch","sprint","inventory","debug","pause"],Ri=5,uo=1,fo=8,Nd=new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAllBMVEUAAAAKAAALFCMOGCwQAgARHTQVFhgWBwAWIzsbGxsdCgEdHR4gICAgKj4gMFAhDQIoEggoKCgqKiosOVAyM0MyQmA0NUY1NTU5Ok4/QFVMSmhbV3NiYmJuaIJ8dpCGhoaUj6akX0SzinW3bk+6j3m8dVrLi3HMgmPOn4fQjmvRjnLVpYzWjG7hmnnnrI3v6eT3uZn4xa/SNdBVAAAAAXRSTlMAQObYZgAABAlJREFUWMPdV22bmjgURYUGUYh2GJdMFgozY6EtUPr//9yecwOOq86jdr7s9iYxIeSenIS8HD1vtEhHyleRqmb+zPdnlXevqSiKfF+r+qWCvdR3A0QgAAZRXdcvL/i5nwGcldaqrcXauwG03mgitC0g8HP/EDRnMYpeR7ufQUQIrRvn3/zOEDaEeG7Eni+22Wwufj7FnpXCBMgsRJp1igsD6+IqANqhXvMb0oCAJ1RGQMFn1dLI+UXgyHhCC46+rMLvfd+37NnV+JxTPyJJX09rBVPlae9Ai299DkFxBNGv7xyBr7R07ivJ0ErRI3obtHaOAoB3HLOv+/7nZmg3P/seY5Eq2RnK9/hw7O+JiwdoBX8ftNh/0x+swYRiCmYciPJnoO3pk1EjRDOPvEAD/dVt89o0/Y+vX3/0DYptDQLYlNyXM19dXPh85YoVF+5r8zx9/+fmlYu5qhzCbds6WASL5Xq9nJ6zp8wyLIJgwTTVG5Nl+/3+HBT+wXq7XR8AbGYQnk4ByqKwbd9W1xlYbMf2HMCCAgjsrzN46vq+y8wpQFHkYFD1p71LhM3n88WC47dZi0VpjZXJcIlzwolJEZgf9R4GgQOABQBIczSo612R5elTlqMxcweQy+TYNP8XQCgY8J4jY/s8zVO7wy8fpLnNWMjTIjOpQbFIjwDikJEDAcACrXM2RCMkgrjERwFODX7LI4AwjhEdCUS0LXJTmHxXpEUqMJJnpQADAIzMEYMgpH/MgRAgSEeAQgAAhMQ8Q7EwJZxZc8QggHecJDIKAUD7wgEYcc1cnpWsLw0ADPNjgCR5AAARQIPv4ZCNjtI7A1ZGyySG/H0AMrAI7Me+BS4tARg6AnQHgBD+MK4FTGQYskMsIbMz1gV++dSavh8QB7LokL8BLNfLJfeBS9vlJ9pq9feX1erTWP68Qrkffg1DVYPDfl8jPwBs/9qumdaIKKzdgnR74Lhcd9867IOuw26quqMh/EdNtor9fwPknrcrPjIJBPD+NHv3PLgZ4L3z4MMWJw8PD4+PSZzEYZgk8d0AOEbi6TDhkfCHfLKz2zozpoIwuBng9La2RVFWbd/+PgNjLGTBBxjkRQFZcBuD+XiQMlIyTHpgCtd7F3+5JCgX5tQD+eic3wIgh7hcMXJVzkUPuDuZOiG9ZQLhHzPKUEQPiEZweuE6ALsXyRCOAJZyA5u4JIS5AQDkubNEtQQBXXOnE1x+8nwJIA6wKyk6JgAnNUpqhfT0+RyA5HHfJwQAmVEPdGM6Xwu43uPk8RGHQkKlEJ4BdIMATPrgQo88C+KxubNQJAMOGMAJg2EQedAhvzqJB61A4bBdL/d79F9XA+QB8+v/qUUoTKIBEXuo67APIA9qyIIzpf4PYyGROiQURDQAAAAASUVORK5CYII=",import.meta.url).href,Ud=(n,e=zn)=>Ft(`controls.actions.${n}`,{},e),Od={moveForward:{primary:"KeyW",secondary:"ArrowUp"},moveBackward:{primary:"KeyS",secondary:"ArrowDown"},moveLeft:{primary:"KeyA",secondary:"ArrowLeft"},moveRight:{primary:"KeyD",secondary:"ArrowRight"},jump:{primary:"ControlRight",secondary:"Space"},crouch:{primary:"Numpad0",secondary:"ControlLeft"},sprint:{primary:"ShiftLeft",secondary:"ShiftRight"},inventory:{primary:"KeyI",secondary:"Tab"},debug:{primary:"F3",secondary:null},pause:{primary:"Escape",secondary:null}},Zs=()=>({keyBindings:structuredClone(Od),skinDataUrl:Nd,startFullscreen:!0,interfaceSize:Ri,language:zn}),or=n=>{if(!Number.isFinite(n))return Ri;const e=Math.round(n);return Math.min(fo,Math.max(uo,e))},Bd=n=>{const e=or(n);return e>=fo?uo:e+1},Tc=n=>{const e=or(n);return e<=Ri?100+(Ri-e)*20:Math.max(10,100-(e-Ri)*10)},Ot=n=>{const e={};return $s.forEach(t=>{e[t]={primary:n[t].primary,secondary:n[t].secondary}}),e},Fd=(n,e=zn)=>n?Id(n)?Ft(`controls.specialKeys.${n}`,{},e):n.startsWith("Key")?n.replace("Key","").toUpperCase():n.startsWith("Digit")?n.replace("Digit",""):n.startsWith("Mouse")?n.replace("Mouse",e==="fr"?"Souris ":"Mouse "):n:Ft("controls.unbound",{},e);class Vd{constructor(e,t,i){this.fixedStepSeconds=e,this.update=t,this.render=i,this.tick=this.tick.bind(this)}running=!1;lastTime=0;accumulator=0;animationFrameId=0;start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.animationFrameId=window.requestAnimationFrame(this.tick))}stop(){this.running&&(this.running=!1,window.cancelAnimationFrame(this.animationFrameId))}tick(e){if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);for(this.lastTime=e,this.accumulator+=t;this.accumulator>=this.fixedStepSeconds;)this.update(this.fixedStepSeconds),this.accumulator-=this.fixedStepSeconds;this.render(this.accumulator/this.fixedStepSeconds),this.animationFrameId=window.requestAnimationFrame(this.tick)}}const $t=128,po=27,xi=9,gr=po+xi,Xi=po,Xn=()=>({blockId:null,count:0});class Wo{slots;selectedHotbarIndex=0;constructor(e,t=0){this.slots=Array.from({length:gr},(i,s)=>{const r=e?.[s];return r?{...r}:Xn()}),this.selectedHotbarIndex=Math.max(0,Math.min(xi-1,t))}getSlots(){return this.slots.map(e=>({...e}))}getMainSlots(){return this.slots.slice(0,po).map(e=>({...e}))}getHotbarSlots(){return this.slots.slice(Xi).map(e=>({...e}))}getSelectedHotbarIndex(){return this.selectedHotbarIndex}setSelectedHotbarIndex(e){e<0||e>=xi||(this.selectedHotbarIndex=e)}shiftSelectedHotbar(e){this.selectedHotbarIndex=((this.selectedHotbarIndex+e)%xi+xi)%xi}getSelectedBlock(){return this.slots[Xi+this.selectedHotbarIndex].blockId}getSelectedAbsoluteSlotIndex(){return Xi+this.selectedHotbarIndex}getSlot(e){return{...this.slots[e]}}setSlot(e,t){if(e<0||e>=gr)return;const i=t.blockId===null?0:Math.max(1,Math.min($t,t.count));this.slots[e]={blockId:t.blockId,count:i}}pickUpSlot(e){const t=this.getSlot(e);return this.slots[e]=Xn(),t}placeCursor(e,t){if(t.blockId===null||t.count<=0)return Xn();const i=this.slots[e];if(i.blockId===null||i.count===0)return this.slots[e]={...t},Xn();if(i.blockId===t.blockId){const s=Math.min($t-i.count,t.count);this.slots[e]={blockId:i.blockId,count:i.count+s};const r=t.count-s;return r>0?{blockId:t.blockId,count:r}:Xn()}return this.slots[e]={...t},{...i}}addBlock(e,t=1){if(!this.canAddBlock(e,t))return!1;let i=t;for(const s of this.iterateHotbarThenMain())if(s.blockId===e&&s.count<$t){const r=Math.min($t-s.count,i);if(s.count+=r,i-=r,i===0)return!0}for(const s of this.iterateHotbarThenMain())if(s.blockId===null||s.count===0){const r=Math.min($t,i);if(s.blockId=e,s.count=r,i-=r,i===0)return!0}return i===0}canAddBlock(e,t=1){let i=t;for(const s of this.iterateHotbarThenMain())if(s.blockId===e?i-=$t-s.count:(s.blockId===null||s.count===0)&&(i-=$t),i<=0)return!0;return!1}removeBlock(e,t){if(this.getBlockCount(e)<t)return!1;let i=t;for(let s=0;s<this.slots.length;s+=1){const r=this.slots[s];if(r.blockId!==e)continue;const a=Math.min(r.count,i);if(r.count-=a,i-=a,r.count===0&&(r.blockId=null),i===0)return!0}return!1}consumeSelectedBlock(){const e=this.getSelectedAbsoluteSlotIndex(),t=this.slots[e];if(t.blockId===null||t.count<=0)return null;t.count-=1;const i=t.blockId;return t.count===0&&(t.blockId=null),i}getBlockCount(e){return this.slots.reduce((t,i)=>i.blockId!==e?t:t+i.count,0)}snapshot(){return this.getSlots()}returnCursor(e){return e.blockId===null||e.count===0||this.addBlock(e.blockId,e.count)?Xn():e}*iterateHotbarThenMain(){for(let e=Xi;e<gr;e+=1)yield this.slots[e];for(let e=0;e<Xi;e+=1)yield this.slots[e]}}const zd=[{id:"planks",mode:"both",ingredients:[{blockId:4,count:1}],output:{blockId:7,count:4}},{id:"crafting_table",mode:"both",ingredients:[{blockId:7,count:4}],output:{blockId:8,count:1}},{id:"stone_bricks",mode:"crafting_table",ingredients:[{blockId:3,count:4}],output:{blockId:9,count:4}}],Gd=(n,e)=>({id:n.id,label:Ft(`recipes.${n.id}.label`,{},e),description:Ft(`recipes.${n.id}.description`,{},e),mode:n.mode,ingredients:n.ingredients.map(t=>({...t})),output:{...n.output}}),Xo=(n,e=wc())=>zd.filter(t=>t.mode==="both"||t.mode===n).map(t=>Gd(t,e)),Rc=(n,e)=>n.canAddBlock(e.output.blockId,e.output.count)?e.ingredients.every(t=>n.getBlockCount(t.blockId)>=t.count):!1,Hd=(n,e)=>Rc(n,e)?(e.ingredients.forEach(t=>{n.removeBlock(t.blockId,t.count)}),n.addBlock(e.output.blockId,e.output.count)):!1;class Wd{constructor(e){this.canvas=e,this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleWheel=this.handleWheel.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this),this.handleContextMenu=this.handleContextMenu.bind(this)}pressedKeys=new Set;justPressedKeys=new Set;pointerLocked=!1;lookDeltaX=0;lookDeltaY=0;primaryDown=!1;primaryClicked=!1;secondaryClicked=!1;wheelSteps=0;pointerLockListener;connect(){window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("mousemove",this.handleMouseMove),window.addEventListener("mousedown",this.handleMouseDown),window.addEventListener("mouseup",this.handleMouseUp),window.addEventListener("wheel",this.handleWheel,{passive:!1}),window.addEventListener("contextmenu",this.handleContextMenu),document.addEventListener("pointerlockchange",this.handlePointerLockChange)}dispose(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("mousemove",this.handleMouseMove),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("wheel",this.handleWheel),window.removeEventListener("contextmenu",this.handleContextMenu),document.removeEventListener("pointerlockchange",this.handlePointerLockChange)}setPointerLockListener(e){this.pointerLockListener=e}requestPointerLock(){return this.canvas.requestPointerLock({unadjustedMovement:!0})}exitPointerLock(){document.pointerLockElement===this.canvas&&document.exitPointerLock()}isPointerLocked(){return this.pointerLocked}isKeyDown(e){return this.pressedKeys.has(e)}isAnyKeyDown(e){return e.some(t=>!!t&&this.pressedKeys.has(t))}consumeLookDelta(){const e={x:this.lookDeltaX,y:this.lookDeltaY};return this.lookDeltaX=0,this.lookDeltaY=0,e}isPrimaryDown(){return this.primaryDown}consumePrimaryClick(){const e=this.primaryClicked;return this.primaryClicked=!1,e}consumeSecondaryClick(){const e=this.secondaryClicked;return this.secondaryClicked=!1,e}consumeWheelSteps(){const e=this.wheelSteps;return this.wheelSteps=0,e}consumeJustPressedKey(e){const t=this.justPressedKeys.has(e);return t&&this.justPressedKeys.delete(e),t}consumeAnyJustPressed(e){for(const t of e)if(t&&this.consumeJustPressedKey(t))return!0;return!1}consumeNumberSlot(){for(let e=1;e<=9;e+=1)if(this.consumeJustPressedKey(`Digit${e}`))return e-1;return null}endFrame(){this.justPressedKeys.clear()}handleKeyDown(e){this.pressedKeys.has(e.code)||this.justPressedKeys.add(e.code),this.pressedKeys.add(e.code)}handleKeyUp(e){this.pressedKeys.delete(e.code)}handleMouseMove(e){this.pointerLocked&&(this.lookDeltaX+=e.movementX,this.lookDeltaY+=e.movementY)}handleMouseDown(e){e.button===0&&(this.primaryDown=!0,this.primaryClicked=!0),e.button===2&&(this.secondaryClicked=!0)}handleMouseUp(e){e.button===0&&(this.primaryDown=!1)}handleWheel(e){this.pointerLocked&&(e.preventDefault(),this.wheelSteps+=Math.sign(e.deltaY))}handleContextMenu(e){e.preventDefault()}handlePointerLockChange(){this.pointerLocked=document.pointerLockElement===this.canvas,this.pointerLockListener?.(this.pointerLocked)}}const mo="180",Xd=0,Yo=1,Yd=2,Cc=1,Pc=2,bn=3,un=0,Lt=1,Sn=2,On=0,Ci=1,qo=2,Ko=3,jo=4,qd=5,ni=100,Kd=101,jd=102,$d=103,Zd=104,Jd=200,Qd=201,eh=202,th=203,ha=204,ua=205,nh=206,ih=207,sh=208,rh=209,ah=210,oh=211,lh=212,ch=213,dh=214,fa=0,pa=1,ma=2,Di=3,ga=4,_a=5,Aa=6,va=7,go=0,hh=1,uh=2,Bn=0,fh=1,ph=2,mh=3,Ic=4,gh=5,_h=6,Ah=7,Lc=300,ki=301,Ni=302,ya=303,ba=304,lr=306,Sa=1e3,En=1001,Ea=1002,Dt=1003,vh=1004,gs=1005,Zt=1006,_r=1007,si=1008,fn=1009,Dc=1010,kc=1011,ts=1012,_o=1013,ai=1014,Mn=1015,ds=1016,Ao=1017,vo=1018,ns=1020,Nc=35902,Uc=35899,Oc=1021,Bc=1022,rn=1023,is=1026,ss=1027,Fc=1028,yo=1029,Vc=1030,bo=1031,So=1033,Ws=33776,Xs=33777,Ys=33778,qs=33779,Ma=35840,xa=35841,wa=35842,Ta=35843,Ra=36196,Ca=37492,Pa=37496,Ia=37808,La=37809,Da=37810,ka=37811,Na=37812,Ua=37813,Oa=37814,Ba=37815,Fa=37816,Va=37817,za=37818,Ga=37819,Ha=37820,Wa=37821,Xa=36492,Ya=36494,qa=36495,Ka=36283,ja=36284,$a=36285,Za=36286,yh=3200,bh=3201,zc=0,Sh=1,Un="",St="srgb",Ui="srgb-linear",Js="linear",Qe="srgb",ci=7680,$o=519,Eh=512,Mh=513,xh=514,Gc=515,wh=516,Th=517,Rh=518,Ch=519,Zo=35044,Jo="300 es",dn=2e3,Qs=2001;class zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ar=Math.PI/180,Ja=180/Math.PI;function hs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function Ph(n,e){return(n%e+e)%e}function vr(n,e,t){return(1-t)*n+t*e}function Yi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ut(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,t=0){Ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class us{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],d=i[s+2],h=i[s+3];const u=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(o===1){e[t+0]=u,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==u||c!==p||d!==g){let m=1-o;const f=l*u+c*p+d*g+h*v,M=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const C=Math.sqrt(w),T=Math.atan2(C,f*M);m=Math.sin(m*T)/C,o=Math.sin(o*T)/C}const b=o*M;if(l=l*m+u*b,c=c*m+p*b,d=d*m+g*b,h=h*m+v*b,m===1-o){const C=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=C,c*=C,d*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],h=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+d*h+l*p-c*u,e[t+1]=l*g+d*u+c*h-o*p,e[t+2]=c*g+d*p+o*u-l*h,e[t+3]=d*g-o*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),h=o(r/2),u=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-i*c,this._z=r*d+a*c+i*l-s*o,this._w=a*d-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-t)*d)/c,u=Math.sin(t*d)/c;return this._w=a*h+this._w*u,this._x=i*h+this._x*u,this._y=s*h+this._y*u,this._z=r*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*c+a*h-o*d,this.y=i+l*d+o*c-r*h,this.z=s+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yr.copy(this).projectOnVector(e),this.sub(yr)}reflect(e){return this.sub(yr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yr=new O,Qo=new us;class Be{constructor(e,t,i,s,r,a,o,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],p=i[5],g=i[8],v=s[0],m=s[3],f=s[6],M=s[1],w=s[4],b=s[7],C=s[2],T=s[5],P=s[8];return r[0]=a*v+o*M+l*C,r[3]=a*m+o*w+l*T,r[6]=a*f+o*b+l*P,r[1]=c*v+d*M+h*C,r[4]=c*m+d*w+h*T,r[7]=c*f+d*b+h*P,r[2]=u*v+p*M+g*C,r[5]=u*m+p*w+g*T,r[8]=u*f+p*b+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,u=o*l-d*r,p=c*r-a*l,g=t*h+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(s*c-d*i)*v,e[2]=(o*i-s*a)*v,e[3]=u*v,e[4]=(d*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(br.makeScale(e,t)),this}rotate(e){return this.premultiply(br.makeRotation(-e)),this}translate(e,t){return this.premultiply(br.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const br=new Be;function Hc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function er(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ih(){const n=er("canvas");return n.style.display="block",n}const el={};function rs(n){n in el||(el[n]=!0,console.warn(n))}function Lh(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const tl=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nl=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dh(){const n={enabled:!0,workingColorSpace:Ui,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qe&&(s.r=xn(s.r),s.g=xn(s.g),s.b=xn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qe&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Un?Js:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return rs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return rs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ui]:{primaries:e,whitePoint:i,transfer:Js,toXYZ:tl,fromXYZ:nl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:St},outputColorSpaceConfig:{drawingBufferColorSpace:St}},[St]:{primaries:e,whitePoint:i,transfer:Qe,toXYZ:tl,fromXYZ:nl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:St}}}),n}const $e=Dh();function xn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Pi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let di;class kh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{di===void 0&&(di=er("canvas")),di.width=e.width,di.height=e.height;const s=di.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=di}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=er("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=xn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(xn(t[i]/255)*255):t[i]=xn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Nh=0;class Eo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=hs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sr(s[a].image)):r.push(Sr(s[a]))}else r=Sr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Sr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?kh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uh=0;const Er=new O;class kt extends zi{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,i=En,s=En,r=Zt,a=si,o=rn,l=fn,c=kt.DEFAULT_ANISOTROPY,d=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=hs(),this.name="",this.source=new Eo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Er).x}get height(){return this.source.getSize(Er).y}get depth(){return this.source.getSize(Er).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sa:e.x=e.x-Math.floor(e.x);break;case En:e.x=e.x<0?0:1;break;case Ea:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sa:e.y=e.y-Math.floor(e.y);break;case En:e.y=e.y<0?0:1;break;case Ea:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=Lc;kt.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,i=0,s=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,b=(p+1)/2,C=(f+1)/2,T=(d+u)/4,P=(h+v)/4,N=(g+m)/4;return w>b&&w>C?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=T/i,r=P/i):b>C?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=T/s,r=N/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=P/r,s=N/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(u-d)*(u-d));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-v)/M,this.z=(u-d)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Oh extends zi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new kt(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Eo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends Oh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Wc extends kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bh extends kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gi{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jt):Jt.fromBufferAttribute(r,a),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_s.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_s.copy(i.boundingBox)),_s.applyMatrix4(e.matrixWorld),this.union(_s)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qi),As.subVectors(this.max,qi),hi.subVectors(e.a,qi),ui.subVectors(e.b,qi),fi.subVectors(e.c,qi),Rn.subVectors(ui,hi),Cn.subVectors(fi,ui),Yn.subVectors(hi,fi);let t=[0,-Rn.z,Rn.y,0,-Cn.z,Cn.y,0,-Yn.z,Yn.y,Rn.z,0,-Rn.x,Cn.z,0,-Cn.x,Yn.z,0,-Yn.x,-Rn.y,Rn.x,0,-Cn.y,Cn.x,0,-Yn.y,Yn.x,0];return!Mr(t,hi,ui,fi,As)||(t=[1,0,0,0,1,0,0,0,1],!Mr(t,hi,ui,fi,As))?!1:(vs.crossVectors(Rn,Cn),t=[vs.x,vs.y,vs.z],Mr(t,hi,ui,fi,As))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const mn=[new O,new O,new O,new O,new O,new O,new O,new O],Jt=new O,_s=new Gi,hi=new O,ui=new O,fi=new O,Rn=new O,Cn=new O,Yn=new O,qi=new O,As=new O,vs=new O,qn=new O;function Mr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){qn.fromArray(n,r);const o=s.x*Math.abs(qn.x)+s.y*Math.abs(qn.y)+s.z*Math.abs(qn.z),l=e.dot(qn),c=t.dot(qn),d=i.dot(qn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Fh=new Gi,Ki=new O,xr=new O;class Mo{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Fh.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ki.subVectors(e,this.center);const t=Ki.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ki,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ki.copy(e.center).add(xr)),this.expandByPoint(Ki.copy(e.center).sub(xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const gn=new O,wr=new O,ys=new O,Pn=new O,Tr=new O,bs=new O,Rr=new O;class Vh{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gn.copy(this.origin).addScaledVector(this.direction,t),gn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){wr.copy(e).add(t).multiplyScalar(.5),ys.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(wr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ys),o=Pn.dot(this.direction),l=-Pn.dot(ys),c=Pn.lengthSq(),d=Math.abs(1-a*a);let h,u,p,g;if(d>0)if(h=a*l-o,u=a*o-l,g=r*d,h>=0)if(u>=-g)if(u<=g){const v=1/d;h*=v,u*=v,p=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+u*(u+2*l)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(wr).addScaledVector(ys,u),p}intersectSphere(e,t){gn.subVectors(e.center,this.origin);const i=gn.dot(this.direction),s=gn.dot(gn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,gn)!==null}intersectTriangle(e,t,i,s,r){Tr.subVectors(t,e),bs.subVectors(i,e),Rr.crossVectors(Tr,bs);let a=this.direction.dot(Rr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,e);const l=o*this.direction.dot(bs.crossVectors(Pn,bs));if(l<0)return null;const c=o*this.direction.dot(Tr.cross(Pn));if(c<0||l+c>a)return null;const d=-o*Pn.dot(Rr);return d<0?null:this.at(d/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,i,s,r,a,o,l,c,d,h,u,p,g,v,m){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,d,h,u,p,g,v,m)}set(e,t,i,s,r,a,o,l,c,d,h,u,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/pi.setFromMatrixColumn(e,0).length(),r=1/pi.setFromMatrixColumn(e,1).length(),a=1/pi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,p=l*h,g=c*d,v=c*h;t[0]=u+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,p=l*h,g=c*d,v=c*h;t[0]=u-v*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,p=a*h,g=o*d,v=o*h;t[0]=l*d,t[4]=g*c-p,t[8]=u*c+v,t[1]=l*h,t[5]=v*c+u,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-u*h,t[8]=g*h+p,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*h+g,t[10]=u-v*h}else if(e.order==="XZY"){const u=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+v,t[5]=a*d,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*d,t[10]=v*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zh,e,Gh)}lookAt(e,t,i){const s=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),In.crossVectors(i,Gt),In.lengthSq()===0&&(Math.abs(i.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),In.crossVectors(i,Gt)),In.normalize(),Ss.crossVectors(Gt,In),s[0]=In.x,s[4]=Ss.x,s[8]=Gt.x,s[1]=In.y,s[5]=Ss.y,s[9]=Gt.y,s[2]=In.z,s[6]=Ss.z,s[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],p=i[13],g=i[2],v=i[6],m=i[10],f=i[14],M=i[3],w=i[7],b=i[11],C=i[15],T=s[0],P=s[4],N=s[8],E=s[12],S=s[1],I=s[5],B=s[9],H=s[13],q=s[2],j=s[6],X=s[10],ee=s[14],z=s[3],se=s[7],oe=s[11],me=s[15];return r[0]=a*T+o*S+l*q+c*z,r[4]=a*P+o*I+l*j+c*se,r[8]=a*N+o*B+l*X+c*oe,r[12]=a*E+o*H+l*ee+c*me,r[1]=d*T+h*S+u*q+p*z,r[5]=d*P+h*I+u*j+p*se,r[9]=d*N+h*B+u*X+p*oe,r[13]=d*E+h*H+u*ee+p*me,r[2]=g*T+v*S+m*q+f*z,r[6]=g*P+v*I+m*j+f*se,r[10]=g*N+v*B+m*X+f*oe,r[14]=g*E+v*H+m*ee+f*me,r[3]=M*T+w*S+b*q+C*z,r[7]=M*P+w*I+b*j+C*se,r[11]=M*N+w*B+b*X+C*oe,r[15]=M*E+w*H+b*ee+C*me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+r*l*h-s*c*h-r*o*u+i*c*u+s*o*p-i*l*p)+v*(+t*l*p-t*c*u+r*a*u-s*a*p+s*c*d-r*l*d)+m*(+t*c*h-t*o*p-r*a*h+i*a*p+r*o*d-i*c*d)+f*(-s*o*d-t*l*h+t*o*u+s*a*h-i*a*u+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],M=h*m*c-v*u*c+v*l*p-o*m*p-h*l*f+o*u*f,w=g*u*c-d*m*c-g*l*p+a*m*p+d*l*f-a*u*f,b=d*v*c-g*h*c+g*o*p-a*v*p-d*o*f+a*h*f,C=g*h*l-d*v*l-g*o*u+a*v*u+d*o*m-a*h*m,T=t*M+i*w+s*b+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/T;return e[0]=M*P,e[1]=(v*u*r-h*m*r-v*s*p+i*m*p+h*s*f-i*u*f)*P,e[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*f+i*l*f)*P,e[3]=(h*l*r-o*u*r-h*s*c+i*u*c+o*s*p-i*l*p)*P,e[4]=w*P,e[5]=(d*m*r-g*u*r+g*s*p-t*m*p-d*s*f+t*u*f)*P,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*f-t*l*f)*P,e[7]=(a*u*r-d*l*r+d*s*c-t*u*c-a*s*p+t*l*p)*P,e[8]=b*P,e[9]=(g*h*r-d*v*r-g*i*p+t*v*p+d*i*f-t*h*f)*P,e[10]=(a*v*r-g*o*r+g*i*c-t*v*c-a*i*f+t*o*f)*P,e[11]=(d*o*r-a*h*r-d*i*c+t*h*c+a*i*p-t*o*p)*P,e[12]=C*P,e[13]=(d*v*s-g*h*s+g*i*u-t*v*u-d*i*m+t*h*m)*P,e[14]=(g*o*s-a*v*s-g*i*l+t*v*l+a*i*m-t*o*m)*P,e[15]=(a*h*s-d*o*s+d*i*l-t*h*l-a*i*u+t*o*u)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,u=r*c,p=r*d,g=r*h,v=a*d,m=a*h,f=o*h,M=l*c,w=l*d,b=l*h,C=i.x,T=i.y,P=i.z;return s[0]=(1-(v+f))*C,s[1]=(p+b)*C,s[2]=(g-w)*C,s[3]=0,s[4]=(p-b)*T,s[5]=(1-(u+f))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+w)*P,s[9]=(m-M)*P,s[10]=(1-(u+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=pi.set(s[0],s[1],s[2]).length();const a=pi.set(s[4],s[5],s[6]).length(),o=pi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Qt.copy(this);const c=1/r,d=1/a,h=1/o;return Qt.elements[0]*=c,Qt.elements[1]*=c,Qt.elements[2]*=c,Qt.elements[4]*=d,Qt.elements[5]*=d,Qt.elements[6]*=d,Qt.elements[8]*=h,Qt.elements[9]*=h,Qt.elements[10]*=h,t.setFromRotationMatrix(Qt),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=dn,l=!1){const c=this.elements,d=2*r/(t-e),h=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===dn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Qs)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=dn,l=!1){const c=this.elements,d=2/(t-e),h=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===dn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Qs)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const pi=new O,Qt=new ut,zh=new O(0,0,0),Gh=new O(1,1,1),In=new O,Ss=new O,Gt=new O,il=new ut,sl=new us;class an{constructor(e=0,t=0,i=0,s=an.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],h=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return il.makeRotationFromQuaternion(e),this.setFromRotationMatrix(il,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sl.setFromEuler(this),this.setFromQuaternion(sl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class Xc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hh=0;const rl=new O,mi=new us,_n=new ut,Es=new O,ji=new O,Wh=new O,Xh=new us,al=new O(1,0,0),ol=new O(0,1,0),ll=new O(0,0,1),cl={type:"added"},Yh={type:"removed"},gi={type:"childadded",child:null},Cr={type:"childremoved",child:null};class vt extends zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new O,t=new an,i=new us,s=new O(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new Be}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.multiply(mi),this}rotateOnWorldAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.premultiply(mi),this}rotateX(e){return this.rotateOnAxis(al,e)}rotateY(e){return this.rotateOnAxis(ol,e)}rotateZ(e){return this.rotateOnAxis(ll,e)}translateOnAxis(e,t){return rl.copy(e).applyQuaternion(this.quaternion),this.position.add(rl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(al,e)}translateY(e){return this.translateOnAxis(ol,e)}translateZ(e){return this.translateOnAxis(ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Es.copy(e):Es.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ji.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(ji,Es,this.up):_n.lookAt(Es,ji,this.up),this.quaternion.setFromRotationMatrix(_n),s&&(_n.extractRotation(s.matrixWorld),mi.setFromRotationMatrix(_n),this.quaternion.premultiply(mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cl),gi.child=e,this.dispatchEvent(gi),gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yh),Cr.child=e,this.dispatchEvent(Cr),Cr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_n.multiply(e.parent.matrixWorld)),e.applyMatrix4(_n),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cl),gi.child=e,this.dispatchEvent(gi),gi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,e,Wh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ji,Xh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}vt.DEFAULT_UP=new O(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new O,An=new O,Pr=new O,vn=new O,_i=new O,Ai=new O,dl=new O,Ir=new O,Lr=new O,Dr=new O,kr=new lt,Nr=new lt,Ur=new lt;class sn{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),en.subVectors(e,t),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){en.subVectors(s,t),An.subVectors(i,t),Pr.subVectors(e,t);const a=en.dot(en),o=en.dot(An),l=en.dot(Pr),c=An.dot(An),d=An.dot(Pr),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const u=1/h,p=(c*l-o*d)*u,g=(a*d-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(a,vn.y),l.addScaledVector(o,vn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return kr.setScalar(0),Nr.setScalar(0),Ur.setScalar(0),kr.fromBufferAttribute(e,t),Nr.fromBufferAttribute(e,i),Ur.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(kr,r.x),a.addScaledVector(Nr,r.y),a.addScaledVector(Ur,r.z),a}static isFrontFacing(e,t,i,s){return en.subVectors(i,t),An.subVectors(e,t),en.cross(An).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),An.subVectors(this.a,this.b),en.cross(An).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return sn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;_i.subVectors(s,i),Ai.subVectors(r,i),Ir.subVectors(e,i);const l=_i.dot(Ir),c=Ai.dot(Ir);if(l<=0&&c<=0)return t.copy(i);Lr.subVectors(e,s);const d=_i.dot(Lr),h=Ai.dot(Lr);if(d>=0&&h<=d)return t.copy(s);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(_i,a);Dr.subVectors(e,r);const p=_i.dot(Dr),g=Ai.dot(Dr);if(g>=0&&p<=g)return t.copy(r);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Ai,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return dl.subVectors(r,s),o=(h-d)/(h-d+(p-g)),t.copy(s).addScaledVector(dl,o);const f=1/(m+v+u);return a=v*f,o=u*f,t.copy(i).addScaledVector(_i,a).addScaledVector(Ai,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Ms={h:0,s:0,l:0};function Or(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=St){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=Ph(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Or(a,r,e+1/3),this.g=Or(a,r,e),this.b=Or(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=St){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=St){const i=Yc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=xn(e.r),this.g=xn(e.g),this.b=xn(e.b),this}copyLinearToSRGB(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=St){return $e.workingToColorSpace(wt.copy(this),e),Math.round(Xe(wt.r*255,0,255))*65536+Math.round(Xe(wt.g*255,0,255))*256+Math.round(Xe(wt.b*255,0,255))}getHexString(e=St){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(wt.copy(this),t);const i=wt.r,s=wt.g,r=wt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=St){$e.workingToColorSpace(wt.copy(this),e);const t=wt.r,i=wt.g,s=wt.b;return e!==St?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ln),this.setHSL(Ln.h+e,Ln.s+t,Ln.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ln),e.getHSL(Ms);const i=vr(Ln.h,Ms.h,t),s=vr(Ln.s,Ms.s,t),r=vr(Ln.l,Ms.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new Ue;Ue.NAMES=Yc;let qh=0;class fs extends zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=hs(),this.name="",this.type="Material",this.blending=Ci,this.side=un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ha,this.blendDst=ua,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Di,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(i.blending=this.blending),this.side!==un&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ha&&(i.blendSrc=this.blendSrc),this.blendDst!==ua&&(i.blendDst=this.blendDst),this.blendEquation!==ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Di&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$o&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class as extends fs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=go,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new O,xs=new Ye;let Kh=0;class hn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Zo,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xs.fromBufferAttribute(this,t),xs.applyMatrix3(e),this.setXY(t,xs.x,xs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Yi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zo&&(e.usage=this.usage),e}}class qc extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Kc extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Xt extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let jh=0;const jt=new ut,Br=new vt,vi=new O,Ht=new Gi,$i=new Gi,At=new O;class Tn extends zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=hs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hc(e)?Kc:qc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Be().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,i){return jt.makeTranslation(e,t,i),this.applyMatrix4(jt),this}scale(e,t,i){return jt.makeScale(e,t,i),this.applyMatrix4(jt),this}lookAt(e){return Br.lookAt(e),Br.updateMatrix(),this.applyMatrix4(Br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];$i.setFromBufferAttribute(o),this.morphTargetsRelative?(At.addVectors(Ht.min,$i.min),Ht.expandByPoint(At),At.addVectors(Ht.max,$i.max),Ht.expandByPoint(At)):(Ht.expandByPoint($i.min),Ht.expandByPoint($i.max))}Ht.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)At.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(At));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)At.fromBufferAttribute(o,c),l&&(vi.fromBufferAttribute(e,c),At.add(vi)),s=Math.max(s,i.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let N=0;N<i.count;N++)o[N]=new O,l[N]=new O;const c=new O,d=new O,h=new O,u=new Ye,p=new Ye,g=new Ye,v=new O,m=new O;function f(N,E,S){c.fromBufferAttribute(i,N),d.fromBufferAttribute(i,E),h.fromBufferAttribute(i,S),u.fromBufferAttribute(r,N),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,S),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(I),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(I),o[N].add(v),o[E].add(v),o[S].add(v),l[N].add(m),l[E].add(m),l[S].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let N=0,E=M.length;N<E;++N){const S=M[N],I=S.start,B=S.count;for(let H=I,q=I+B;H<q;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const w=new O,b=new O,C=new O,T=new O;function P(N){C.fromBufferAttribute(s,N),T.copy(C);const E=o[N];w.copy(E),w.sub(C.multiplyScalar(C.dot(E))).normalize(),b.crossVectors(T,E);const I=b.dot(l[N])<0?-1:1;a.setXYZW(N,w.x,w.y,w.z,I)}for(let N=0,E=M.length;N<E;++N){const S=M[N],I=S.start,B=S.count;for(let H=I,q=I+B;H<q;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,d=new O,h=new O;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new hn(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=e(u,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hl=new ut,Kn=new Vh,ws=new Mo,ul=new O,Ts=new O,Rs=new O,Cs=new O,Fr=new O,Ps=new O,fl=new O,Is=new O;class Et extends vt{constructor(e=new Tn,t=new as){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(Fr.fromBufferAttribute(h,e),a?Ps.addScaledVector(Fr,d):Ps.addScaledVector(Fr.sub(t),d))}t.add(Ps)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ws.copy(i.boundingSphere),ws.applyMatrix4(r),Kn.copy(e.ray).recast(e.near),!(ws.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(ws,ul)===null||Kn.origin.distanceToSquared(ul)>(e.far-e.near)**2))&&(hl.copy(r).invert(),Kn.copy(e.ray).applyMatrix4(hl),!(i.boundingBox!==null&&Kn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),w=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,C=w;b<C;b+=3){const T=o.getX(b),P=o.getX(b+1),N=o.getX(b+2);s=Ls(this,f,e,i,c,d,h,T,P,N),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const M=o.getX(m),w=o.getX(m+1),b=o.getX(m+2);s=Ls(this,a,e,i,c,d,h,M,w,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),w=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,C=w;b<C;b+=3){const T=b,P=b+1,N=b+2;s=Ls(this,f,e,i,c,d,h,T,P,N),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const M=m,w=m+1,b=m+2;s=Ls(this,a,e,i,c,d,h,M,w,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function $h(n,e,t,i,s,r,a,o){let l;if(e.side===Lt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===un,o),l===null)return null;Is.copy(o),Is.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Is);return c<t.near||c>t.far?null:{distance:c,point:Is.clone(),object:n}}function Ls(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Ts),n.getVertexPosition(l,Rs),n.getVertexPosition(c,Cs);const d=$h(n,e,t,i,Ts,Rs,Cs,fl);if(d){const h=new O;sn.getBarycoord(fl,Ts,Rs,Cs,h),s&&(d.uv=sn.getInterpolatedAttribute(s,o,l,c,h,new Ye)),r&&(d.uv1=sn.getInterpolatedAttribute(r,o,l,c,h,new Ye)),a&&(d.normal=sn.getInterpolatedAttribute(a,o,l,c,h,new O),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new O,materialIndex:0};sn.getNormal(Ts,Rs,Cs,u.normal),d.face=u,d.barycoord=h}return d}class Yt extends Tn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(d,3)),this.setAttribute("uv",new Xt(h,2));function g(v,m,f,M,w,b,C,T,P,N,E){const S=b/P,I=C/N,B=b/2,H=C/2,q=T/2,j=P+1,X=N+1;let ee=0,z=0;const se=new O;for(let oe=0;oe<X;oe++){const me=oe*I-H;for(let De=0;De<j;De++){const Ke=De*S-B;se[v]=Ke*M,se[m]=me*w,se[f]=q,c.push(se.x,se.y,se.z),se[v]=0,se[m]=0,se[f]=T>0?1:-1,d.push(se.x,se.y,se.z),h.push(De/P),h.push(1-oe/N),ee+=1}}for(let oe=0;oe<N;oe++)for(let me=0;me<P;me++){const De=u+me+j*oe,Ke=u+me+j*(oe+1),He=u+(me+1)+j*(oe+1),Fe=u+(me+1)+j*oe;l.push(De,Ke,Fe),l.push(Ke,He,Fe),z+=6}o.addGroup(p,z,E),p+=z,u+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Oi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Pt(n){const e={};for(let t=0;t<n.length;t++){const i=Oi(n[t]);for(const s in i)e[s]=i[s]}return e}function Zh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function jc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Jh={clone:Oi,merge:Pt};var Qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends fs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qh,this.fragmentShader=eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Oi(e.uniforms),this.uniformsGroups=Zh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class $c extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new O,pl=new Ye,ml=new Ye;class It extends $c{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ja*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ar*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ja*2*Math.atan(Math.tan(Ar*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Dn.x,Dn.y).multiplyScalar(-e/Dn.z)}getViewSize(e,t){return this.getViewBounds(e,pl,ml),t.subVectors(ml,pl)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ar*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const yi=-90,bi=1;class tu extends vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new It(yi,bi,e,t);s.layers=this.layers,this.add(s);const r=new It(yi,bi,e,t);r.layers=this.layers,this.add(r);const a=new It(yi,bi,e,t);a.layers=this.layers,this.add(a);const o=new It(yi,bi,e,t);o.layers=this.layers,this.add(o);const l=new It(yi,bi,e,t);l.layers=this.layers,this.add(l);const c=new It(yi,bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===dn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class xo extends kt{constructor(e=[],t=ki,i,s,r,a,o,l,c,d){super(e,t,i,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nu extends oi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new xo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Yt(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:Oi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Lt,blending:On});r.uniforms.tEquirect.value=t;const a=new Et(s,r),o=t.minFilter;return t.minFilter===si&&(t.minFilter=Zt),new tu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}class Wt extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const iu={type:"move"};class Vr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(iu)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Wt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class wo{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=i}clone(){return new wo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class tr extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const zr=new O,su=new O,ru=new Be;class Qn{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=zr.subVectors(i,t).cross(su.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(zr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ru.getNormalMatrix(e),s=this.coplanarPoint(zr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new Mo,au=new Ye(.5,.5),Ds=new O;class To{constructor(e=new Qn,t=new Qn,i=new Qn,s=new Qn,r=new Qn,a=new Qn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=dn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],h=r[5],u=r[6],p=r[7],g=r[8],v=r[9],m=r[10],f=r[11],M=r[12],w=r[13],b=r[14],C=r[15];if(s[0].setComponents(c-a,p-d,f-g,C-M).normalize(),s[1].setComponents(c+a,p+d,f+g,C+M).normalize(),s[2].setComponents(c+o,p+h,f+v,C+w).normalize(),s[3].setComponents(c-o,p-h,f-v,C-w).normalize(),i)s[4].setComponents(l,u,m,b).normalize(),s[5].setComponents(c-l,p-u,f-m,C-b).normalize();else if(s[4].setComponents(c-l,p-u,f-m,C-b).normalize(),t===dn)s[5].setComponents(c+l,p+u,f+m,C+b).normalize();else if(t===Qs)s[5].setComponents(l,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(e){jn.center.set(0,0,0);const t=au.distanceTo(e.center);return jn.radius=.7071067811865476+t,jn.applyMatrix4(e.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ds.x=s.normal.x>0?e.max.x:e.min.x,Ds.y=s.normal.y>0?e.max.y:e.min.y,Ds.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ds)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zc extends kt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Jc extends kt{constructor(e,t,i=ai,s,r,a,o=Dt,l=Dt,c,d=is,h=1){if(d!==is&&d!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,s,r,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Eo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Qc extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cr extends Tn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,h=e/o,u=t/l,p=[],g=[],v=[],m=[];for(let f=0;f<d;f++){const M=f*u-a;for(let w=0;w<c;w++){const b=w*h-r;g.push(b,-M,0),v.push(0,0,1),m.push(w/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){const w=M+c*f,b=M+c*(f+1),C=M+1+c*(f+1),T=M+1+c*f;p.push(w,b,T),p.push(b,C,T)}this.setIndex(p),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(v,3)),this.setAttribute("uv",new Xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ro extends Tn{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new O,u=new O,p=[],g=[],v=[],m=[];for(let f=0;f<=i;f++){const M=[],w=f/i;let b=0;f===0&&a===0?b=.5/t:f===i&&l===Math.PI&&(b=-.5/t);for(let C=0;C<=t;C++){const T=C/t;h.x=-e*Math.cos(s+T*r)*Math.sin(a+w*o),h.y=e*Math.cos(a+w*o),h.z=e*Math.sin(s+T*r)*Math.sin(a+w*o),g.push(h.x,h.y,h.z),u.copy(h).normalize(),v.push(u.x,u.y,u.z),m.push(T+b,1-w),M.push(c++)}d.push(M)}for(let f=0;f<i;f++)for(let M=0;M<t;M++){const w=d[f][M+1],b=d[f][M],C=d[f+1][M],T=d[f+1][M+1];(f!==0||a>0)&&p.push(w,b,T),(f!==i-1||l<Math.PI)&&p.push(b,C,T)}this.setIndex(p),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(v,3)),this.setAttribute("uv",new Xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ro(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class dr extends fs{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=go,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ou extends fs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lu extends fs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Co extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class cu extends Co{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Gr=new ut,gl=new O,_l=new O;class du{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new To,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;gl.setFromMatrixPosition(e.matrixWorld),t.position.copy(gl),_l.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_l),t.updateMatrixWorld(),Gr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gr,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Gr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ed extends $c{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class hu extends du{constructor(){super(new ed(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nr extends Co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new hu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Po extends Co{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class uu extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class td{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Al(n,e,t,i){const s=fu(i);switch(t){case Oc:return n*e;case Fc:return n*e/s.components*s.byteLength;case yo:return n*e/s.components*s.byteLength;case Vc:return n*e*2/s.components*s.byteLength;case bo:return n*e*2/s.components*s.byteLength;case Bc:return n*e*3/s.components*s.byteLength;case rn:return n*e*4/s.components*s.byteLength;case So:return n*e*4/s.components*s.byteLength;case Ws:case Xs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ys:case qs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xa:case Ta:return Math.max(n,16)*Math.max(e,8)/4;case Ma:case wa:return Math.max(n,8)*Math.max(e,8)/2;case Ra:case Ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case La:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Da:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ka:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Na:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ba:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Va:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case za:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ga:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ha:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Wa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Xa:case Ya:case qa:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ka:case ja:return Math.ceil(n/4)*Math.ceil(e/4)*8;case $a:case Za:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function fu(n){switch(n){case fn:case Dc:return{byteLength:1,components:1};case ts:case kc:case ds:return{byteLength:2,components:1};case Ao:case vo:return{byteLength:2,components:4};case ai:case _o:case Mn:return{byteLength:4,components:1};case Nc:case Uc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mo);function nd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function pu(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,h[u]=v)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];n.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var mu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Au=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Mu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ru=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Cu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Bu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$u=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ju=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ef=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,af=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,of=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,df=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ff=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,pf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_f=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Af=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ef=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,If=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Of=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ff=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$f=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ep=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,np=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ip=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,op=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,dp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ep=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Pp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Np=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Up=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Op=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:mu,alphahash_pars_fragment:gu,alphamap_fragment:_u,alphamap_pars_fragment:Au,alphatest_fragment:vu,alphatest_pars_fragment:yu,aomap_fragment:bu,aomap_pars_fragment:Su,batching_pars_vertex:Eu,batching_vertex:Mu,begin_vertex:xu,beginnormal_vertex:wu,bsdfs:Tu,iridescence_fragment:Ru,bumpmap_pars_fragment:Cu,clipping_planes_fragment:Pu,clipping_planes_pars_fragment:Iu,clipping_planes_pars_vertex:Lu,clipping_planes_vertex:Du,color_fragment:ku,color_pars_fragment:Nu,color_pars_vertex:Uu,color_vertex:Ou,common:Bu,cube_uv_reflection_fragment:Fu,defaultnormal_vertex:Vu,displacementmap_pars_vertex:zu,displacementmap_vertex:Gu,emissivemap_fragment:Hu,emissivemap_pars_fragment:Wu,colorspace_fragment:Xu,colorspace_pars_fragment:Yu,envmap_fragment:qu,envmap_common_pars_fragment:Ku,envmap_pars_fragment:ju,envmap_pars_vertex:$u,envmap_physical_pars_fragment:lf,envmap_vertex:Zu,fog_vertex:Ju,fog_pars_vertex:Qu,fog_fragment:ef,fog_pars_fragment:tf,gradientmap_pars_fragment:nf,lightmap_pars_fragment:sf,lights_lambert_fragment:rf,lights_lambert_pars_fragment:af,lights_pars_begin:of,lights_toon_fragment:cf,lights_toon_pars_fragment:df,lights_phong_fragment:hf,lights_phong_pars_fragment:uf,lights_physical_fragment:ff,lights_physical_pars_fragment:pf,lights_fragment_begin:mf,lights_fragment_maps:gf,lights_fragment_end:_f,logdepthbuf_fragment:Af,logdepthbuf_pars_fragment:vf,logdepthbuf_pars_vertex:yf,logdepthbuf_vertex:bf,map_fragment:Sf,map_pars_fragment:Ef,map_particle_fragment:Mf,map_particle_pars_fragment:xf,metalnessmap_fragment:wf,metalnessmap_pars_fragment:Tf,morphinstance_vertex:Rf,morphcolor_vertex:Cf,morphnormal_vertex:Pf,morphtarget_pars_vertex:If,morphtarget_vertex:Lf,normal_fragment_begin:Df,normal_fragment_maps:kf,normal_pars_fragment:Nf,normal_pars_vertex:Uf,normal_vertex:Of,normalmap_pars_fragment:Bf,clearcoat_normal_fragment_begin:Ff,clearcoat_normal_fragment_maps:Vf,clearcoat_pars_fragment:zf,iridescence_pars_fragment:Gf,opaque_fragment:Hf,packing:Wf,premultiplied_alpha_fragment:Xf,project_vertex:Yf,dithering_fragment:qf,dithering_pars_fragment:Kf,roughnessmap_fragment:jf,roughnessmap_pars_fragment:$f,shadowmap_pars_fragment:Zf,shadowmap_pars_vertex:Jf,shadowmap_vertex:Qf,shadowmask_pars_fragment:ep,skinbase_vertex:tp,skinning_pars_vertex:np,skinning_vertex:ip,skinnormal_vertex:sp,specularmap_fragment:rp,specularmap_pars_fragment:ap,tonemapping_fragment:op,tonemapping_pars_fragment:lp,transmission_fragment:cp,transmission_pars_fragment:dp,uv_pars_fragment:hp,uv_pars_vertex:up,uv_vertex:fp,worldpos_vertex:pp,background_vert:mp,background_frag:gp,backgroundCube_vert:_p,backgroundCube_frag:Ap,cube_vert:vp,cube_frag:yp,depth_vert:bp,depth_frag:Sp,distanceRGBA_vert:Ep,distanceRGBA_frag:Mp,equirect_vert:xp,equirect_frag:wp,linedashed_vert:Tp,linedashed_frag:Rp,meshbasic_vert:Cp,meshbasic_frag:Pp,meshlambert_vert:Ip,meshlambert_frag:Lp,meshmatcap_vert:Dp,meshmatcap_frag:kp,meshnormal_vert:Np,meshnormal_frag:Up,meshphong_vert:Op,meshphong_frag:Bp,meshphysical_vert:Fp,meshphysical_frag:Vp,meshtoon_vert:zp,meshtoon_frag:Gp,points_vert:Hp,points_frag:Wp,shadow_vert:Xp,shadow_frag:Yp,sprite_vert:qp,sprite_frag:Kp},ae={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},cn={basic:{uniforms:Pt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Pt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Pt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Pt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Pt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Pt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Pt([ae.points,ae.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Pt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Pt([ae.common,ae.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Pt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Pt([ae.sprite,ae.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Pt([ae.common,ae.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Pt([ae.lights,ae.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};cn.physical={uniforms:Pt([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ks={r:0,b:0,g:0},$n=new an,jp=new ut;function $p(n,e,t,i,s,r,a){const o=new Ue(0);let l=r===!0?0:1,c,d,h=null,u=0,p=null;function g(w){let b=w.isScene===!0?w.background:null;return b&&b.isTexture&&(b=(w.backgroundBlurriness>0?t:e).get(b)),b}function v(w){let b=!1;const C=g(w);C===null?f(o,l):C&&C.isColor&&(f(C,1),b=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,b){const C=g(b);C&&(C.isCubeTexture||C.mapping===lr)?(d===void 0&&(d=new Et(new Yt(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Oi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(T,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),$n.copy(b.backgroundRotation),$n.x*=-1,$n.y*=-1,$n.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&($n.y*=-1,$n.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(jp.makeRotationFromEuler($n)),d.material.toneMapped=$e.getTransfer(C.colorSpace)!==Qe,(h!==C||u!==C.version||p!==n.toneMapping)&&(d.material.needsUpdate=!0,h=C,u=C.version,p=n.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Et(new cr(2,2),new wn({name:"BackgroundMaterial",uniforms:Oi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=$e.getTransfer(C.colorSpace)!==Qe,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||u!==C.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=C,u=C.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,b){w.getRGB(ks,jc(n)),i.buffers.color.setClear(ks.r,ks.g,ks.b,b,a)}function M(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,b=1){o.set(w),l=b,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(o,l)},render:v,addToRenderList:m,dispose:M}}function Zp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(S,I,B,H,q){let j=!1;const X=h(H,B,I);r!==X&&(r=X,c(r.object)),j=p(S,H,B,q),j&&g(S,H,B,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,b(S,I,B,H),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function d(S){return n.deleteVertexArray(S)}function h(S,I,B){const H=B.wireframe===!0;let q=i[S.id];q===void 0&&(q={},i[S.id]=q);let j=q[I.id];j===void 0&&(j={},q[I.id]=j);let X=j[H];return X===void 0&&(X=u(l()),j[H]=X),X}function u(S){const I=[],B=[],H=[];for(let q=0;q<t;q++)I[q]=0,B[q]=0,H[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:H,object:S,attributes:{},index:null}}function p(S,I,B,H){const q=r.attributes,j=I.attributes;let X=0;const ee=B.getAttributes();for(const z in ee)if(ee[z].location>=0){const oe=q[z];let me=j[z];if(me===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(me=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(me=S.instanceColor)),oe===void 0||oe.attribute!==me||me&&oe.data!==me.data)return!0;X++}return r.attributesNum!==X||r.index!==H}function g(S,I,B,H){const q={},j=I.attributes;let X=0;const ee=B.getAttributes();for(const z in ee)if(ee[z].location>=0){let oe=j[z];oe===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(oe=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(oe=S.instanceColor));const me={};me.attribute=oe,oe&&oe.data&&(me.data=oe.data),q[z]=me,X++}r.attributes=q,r.attributesNum=X,r.index=H}function v(){const S=r.newAttributes;for(let I=0,B=S.length;I<B;I++)S[I]=0}function m(S){f(S,0)}function f(S,I){const B=r.newAttributes,H=r.enabledAttributes,q=r.attributeDivisors;B[S]=1,H[S]===0&&(n.enableVertexAttribArray(S),H[S]=1),q[S]!==I&&(n.vertexAttribDivisor(S,I),q[S]=I)}function M(){const S=r.newAttributes,I=r.enabledAttributes;for(let B=0,H=I.length;B<H;B++)I[B]!==S[B]&&(n.disableVertexAttribArray(B),I[B]=0)}function w(S,I,B,H,q,j,X){X===!0?n.vertexAttribIPointer(S,I,B,q,j):n.vertexAttribPointer(S,I,B,H,q,j)}function b(S,I,B,H){v();const q=H.attributes,j=B.getAttributes(),X=I.defaultAttributeValues;for(const ee in j){const z=j[ee];if(z.location>=0){let se=q[ee];if(se===void 0&&(ee==="instanceMatrix"&&S.instanceMatrix&&(se=S.instanceMatrix),ee==="instanceColor"&&S.instanceColor&&(se=S.instanceColor)),se!==void 0){const oe=se.normalized,me=se.itemSize,De=e.get(se);if(De===void 0)continue;const Ke=De.buffer,He=De.type,Fe=De.bytesPerElement,Y=He===n.INT||He===n.UNSIGNED_INT||se.gpuType===_o;if(se.isInterleavedBufferAttribute){const Z=se.data,fe=Z.stride,Ie=se.offset;if(Z.isInstancedInterleavedBuffer){for(let Ee=0;Ee<z.locationSize;Ee++)f(z.location+Ee,Z.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Ee=0;Ee<z.locationSize;Ee++)m(z.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,Ke);for(let Ee=0;Ee<z.locationSize;Ee++)w(z.location+Ee,me/z.locationSize,He,oe,fe*Fe,(Ie+me/z.locationSize*Ee)*Fe,Y)}else{if(se.isInstancedBufferAttribute){for(let Z=0;Z<z.locationSize;Z++)f(z.location+Z,se.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Z=0;Z<z.locationSize;Z++)m(z.location+Z);n.bindBuffer(n.ARRAY_BUFFER,Ke);for(let Z=0;Z<z.locationSize;Z++)w(z.location+Z,me/z.locationSize,He,oe,me*Fe,me/z.locationSize*Z*Fe,Y)}}else if(X!==void 0){const oe=X[ee];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(z.location,oe);break;case 3:n.vertexAttrib3fv(z.location,oe);break;case 4:n.vertexAttrib4fv(z.location,oe);break;default:n.vertexAttrib1fv(z.location,oe)}}}}M()}function C(){N();for(const S in i){const I=i[S];for(const B in I){const H=I[B];for(const q in H)d(H[q].object),delete H[q];delete I[B]}delete i[S]}}function T(S){if(i[S.id]===void 0)return;const I=i[S.id];for(const B in I){const H=I[B];for(const q in H)d(H[q].object),delete H[q];delete I[B]}delete i[S.id]}function P(S){for(const I in i){const B=i[I];if(B[S.id]===void 0)continue;const H=B[S.id];for(const q in H)d(H[q].object),delete H[q];delete B[S.id]}}function N(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Jp(n,e,t){let i;function s(c){i=c}function r(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function a(c,d,h){h!==0&&(n.drawArraysInstanced(i,c,d,h),t.update(d,i,h))}function o(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let p=0;for(let g=0;g<h;g++)p+=d[g];t.update(p,i,1)}function l(c,d,h,u){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],d[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,u,0,h);let g=0;for(let v=0;v<h;v++)g+=d[v]*u[v];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Qp(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==rn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const N=P===ds&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==fn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Mn&&!N)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:b,vertexTextures:C,maxSamples:T}}function em(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Qn,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||s;return s=u,i=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const M=r?0:i,w=M*4;let b=f.clippingState||null;l.value=b,b=d(g,u,w,p);for(let C=0;C!==w;++C)b[C]=t[C];f.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let w=0,b=p;w!==v;++w,b+=4)a.copy(h[w]).applyMatrix4(M,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function tm(n){let e=new WeakMap;function t(a,o){return o===ya?a.mapping=ki:o===ba&&(a.mapping=Ni),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ya||o===ba)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new nu(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const wi=4,vl=[.125,.215,.35,.446,.526,.582],ii=20,Hr=new ed,yl=new Ue;let Wr=null,Xr=0,Yr=0,qr=!1;const ei=(1+Math.sqrt(5))/2,Si=1/ei,bl=[new O(-ei,Si,0),new O(ei,Si,0),new O(-Si,0,ei),new O(Si,0,ei),new O(0,ei,-Si),new O(0,ei,Si),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],nm=new O;class Sl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=nm}=r;Wr=this._renderer.getRenderTarget(),Xr=this._renderer.getActiveCubeFace(),Yr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Wr,Xr,Yr),this._renderer.xr.enabled=qr,e.scissorTest=!1,Ns(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ki||e.mapping===Ni?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wr=this._renderer.getRenderTarget(),Xr=this._renderer.getActiveCubeFace(),Yr=this._renderer.getActiveMipmapLevel(),qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:ds,format:rn,colorSpace:Ui,depthBuffer:!1},s=El(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=El(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=im(r)),this._blurMaterial=sm(r,e,t)}return s}_compileMaterial(e){const t=new Et(this._lodPlanes[0],e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,i,s,r){const l=new It(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(yl),h.toneMapping=Bn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const v=new as({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),m=new Et(new Yt,v);let f=!1;const M=e.background;M?M.isColor&&(v.color.copy(M),e.background=null,f=!0):(v.color.copy(yl),f=!0);for(let w=0;w<6;w++){const b=w%3;b===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[w],r.y,r.z)):b===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[w]));const C=this._cubeSize;Ns(s,b*C,w>2?C:0,C,C),h.setRenderTarget(s),f&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=p,h.autoClear=u,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ki||e.mapping===Ni;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ml());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Et(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ns(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Hr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=bl[(s-r-1)%bl.length];this._blur(e,r-1,r,a,o)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new Et(this._lodPlanes[s],c),u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ii-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):ii;m>ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ii}`);const f=[];let M=0;for(let P=0;P<ii;++P){const N=P/v,E=Math.exp(-N*N/2);f.push(E),P===0?M+=E:P<m&&(M+=2*E)}for(let P=0;P<f.length;P++)f[P]=f[P]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:w}=this;u.dTheta.value=g,u.mipInt.value=w-i;const b=this._sizeLods[s],C=3*b*(s>w-wi?s-w+wi:0),T=4*(this._cubeSize-b);Ns(t,C,T,3*b,2*b),l.setRenderTarget(t),l.render(h,Hr)}}function im(n){const e=[],t=[],i=[];let s=n;const r=n-wi+1+vl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-wi?l=vl[a-n+wi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,v=3,m=2,f=1,M=new Float32Array(v*g*p),w=new Float32Array(m*g*p),b=new Float32Array(f*g*p);for(let T=0;T<p;T++){const P=T%3*2/3-1,N=T>2?0:-1,E=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];M.set(E,v*g*T),w.set(u,m*g*T);const S=[T,T,T,T,T,T];b.set(S,f*g*T)}const C=new Tn;C.setAttribute("position",new hn(M,v)),C.setAttribute("uv",new hn(w,m)),C.setAttribute("faceIndex",new hn(b,f)),e.push(C),s>wi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function El(n,e,t){const i=new oi(n,e,t);return i.texture.mapping=lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ns(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function sm(n,e,t){const i=new Float32Array(ii),s=new O(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Ml(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function xl(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Io(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Io(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function rm(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ya||l===ba,d=l===ki||l===Ni;if(c||d){let h=e.get(o);const u=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Sl(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||d&&p&&s(p)?(t===null&&(t=new Sl(n)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function am(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&rs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function om(n,e,t,i){const s={},r=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const M=p.array;v=p.version;for(let w=0,b=M.length;w<b;w+=3){const C=M[w+0],T=M[w+1],P=M[w+2];u.push(C,T,T,P,P,C)}}else if(g!==void 0){const M=g.array;v=g.version;for(let w=0,b=M.length/3-1;w<b;w+=3){const C=w+0,T=w+1,P=w+2;u.push(C,T,T,P,P,C)}}else return;const m=new(Hc(u)?Kc:qc)(u,1);m.version=v;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function d(h){const u=r.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function lm(n,e,t){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,p){n.drawElements(i,p,r,u*a),t.update(p,i,1)}function c(u,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,u*a,g),t.update(p,i,g))}function d(u,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function h(u,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)c(u[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,u,0,v,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*v[M];t.update(f,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function cm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function dm(n,e,t){const i=new WeakMap,s=new lt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let E=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let w=0;p===!0&&(w=1),g===!0&&(w=2),v===!0&&(w=3);let b=o.attributes.position.count*w,C=1;b>e.maxTextureSize&&(C=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*C*4*h),P=new Wc(T,b,C,h);P.type=Mn,P.needsUpdate=!0;const N=w*4;for(let S=0;S<h;S++){const I=m[S],B=f[S],H=M[S],q=b*C*4*S;for(let j=0;j<I.count;j++){const X=j*N;p===!0&&(s.fromBufferAttribute(I,j),T[q+X+0]=s.x,T[q+X+1]=s.y,T[q+X+2]=s.z,T[q+X+3]=0),g===!0&&(s.fromBufferAttribute(B,j),T[q+X+4]=s.x,T[q+X+5]=s.y,T[q+X+6]=s.z,T[q+X+7]=0),v===!0&&(s.fromBufferAttribute(H,j),T[q+X+8]=s.x,T[q+X+9]=s.y,T[q+X+10]=s.z,T[q+X+11]=H.itemSize===4?s.w:1)}}u={count:h,texture:P,size:new Ye(b,C)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function hm(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const id=new kt,wl=new Jc(1,1),sd=new Wc,rd=new Bh,ad=new xo,Tl=[],Rl=[],Cl=new Float32Array(16),Pl=new Float32Array(9),Il=new Float32Array(4);function Hi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Tl[s];if(r===void 0&&(r=new Float32Array(s),Tl[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function hr(n,e){let t=Rl[e];t===void 0&&(t=new Int32Array(e),Rl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function um(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2fv(this.addr,e),gt(t,e)}}function pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;n.uniform3fv(this.addr,e),gt(t,e)}}function mm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4fv(this.addr,e),gt(t,e)}}function gm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;Il.set(i),n.uniformMatrix2fv(this.addr,!1,Il),gt(t,i)}}function _m(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;Pl.set(i),n.uniformMatrix3fv(this.addr,!1,Pl),gt(t,i)}}function Am(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;Cl.set(i),n.uniformMatrix4fv(this.addr,!1,Cl),gt(t,i)}}function vm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ym(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2iv(this.addr,e),gt(t,e)}}function bm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3iv(this.addr,e),gt(t,e)}}function Sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4iv(this.addr,e),gt(t,e)}}function Em(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Mm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2uiv(this.addr,e),gt(t,e)}}function xm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3uiv(this.addr,e),gt(t,e)}}function wm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4uiv(this.addr,e),gt(t,e)}}function Tm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(wl.compareFunction=Gc,r=wl):r=id,t.setTexture2D(e||r,s)}function Rm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||rd,s)}function Cm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||ad,s)}function Pm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||sd,s)}function Im(n){switch(n){case 5126:return um;case 35664:return fm;case 35665:return pm;case 35666:return mm;case 35674:return gm;case 35675:return _m;case 35676:return Am;case 5124:case 35670:return vm;case 35667:case 35671:return ym;case 35668:case 35672:return bm;case 35669:case 35673:return Sm;case 5125:return Em;case 36294:return Mm;case 36295:return xm;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Tm;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Cm;case 36289:case 36303:case 36311:case 36292:return Pm}}function Lm(n,e){n.uniform1fv(this.addr,e)}function Dm(n,e){const t=Hi(e,this.size,2);n.uniform2fv(this.addr,t)}function km(n,e){const t=Hi(e,this.size,3);n.uniform3fv(this.addr,t)}function Nm(n,e){const t=Hi(e,this.size,4);n.uniform4fv(this.addr,t)}function Um(n,e){const t=Hi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Om(n,e){const t=Hi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Bm(n,e){const t=Hi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Fm(n,e){n.uniform1iv(this.addr,e)}function Vm(n,e){n.uniform2iv(this.addr,e)}function zm(n,e){n.uniform3iv(this.addr,e)}function Gm(n,e){n.uniform4iv(this.addr,e)}function Hm(n,e){n.uniform1uiv(this.addr,e)}function Wm(n,e){n.uniform2uiv(this.addr,e)}function Xm(n,e){n.uniform3uiv(this.addr,e)}function Ym(n,e){n.uniform4uiv(this.addr,e)}function qm(n,e,t){const i=this.cache,s=e.length,r=hr(t,s);mt(i,r)||(n.uniform1iv(this.addr,r),gt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||id,r[a])}function Km(n,e,t){const i=this.cache,s=e.length,r=hr(t,s);mt(i,r)||(n.uniform1iv(this.addr,r),gt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||rd,r[a])}function jm(n,e,t){const i=this.cache,s=e.length,r=hr(t,s);mt(i,r)||(n.uniform1iv(this.addr,r),gt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||ad,r[a])}function $m(n,e,t){const i=this.cache,s=e.length,r=hr(t,s);mt(i,r)||(n.uniform1iv(this.addr,r),gt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||sd,r[a])}function Zm(n){switch(n){case 5126:return Lm;case 35664:return Dm;case 35665:return km;case 35666:return Nm;case 35674:return Um;case 35675:return Om;case 35676:return Bm;case 5124:case 35670:return Fm;case 35667:case 35671:return Vm;case 35668:case 35672:return zm;case 35669:case 35673:return Gm;case 5125:return Hm;case 36294:return Wm;case 36295:return Xm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return qm;case 35679:case 36299:case 36307:return Km;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return $m}}class Jm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Im(t.type)}}class Qm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zm(t.type)}}class eg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Kr=/(\w+)(\])?(\[|\.)?/g;function Ll(n,e){n.seq.push(e),n.map[e.id]=e}function tg(n,e,t){const i=n.name,s=i.length;for(Kr.lastIndex=0;;){const r=Kr.exec(i),a=Kr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ll(t,c===void 0?new Jm(o,n,e):new Qm(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new eg(o),Ll(t,h)),t=h}}}class Ks{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);tg(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Dl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ng=37297;let ig=0;function sg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const kl=new Be;function rg(n){$e._getMatrix(kl,$e.workingColorSpace,n);const e=`mat3( ${kl.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Js:return[e,"LinearTransferOETF"];case Qe:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Nl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+sg(n.getShaderSource(e),o)}else return r}function ag(n,e){const t=rg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function og(n,e){let t;switch(e){case fh:t="Linear";break;case ph:t="Reinhard";break;case mh:t="Cineon";break;case Ic:t="ACESFilmic";break;case _h:t="AgX";break;case Ah:t="Neutral";break;case gh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Us=new O;function lg(){$e.getLuminanceCoefficients(Us);const n=Us.x.toFixed(4),e=Us.y.toFixed(4),t=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ji).join(`
`)}function dg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function hg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ji(n){return n!==""}function Ul(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ol(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(n){return n.replace(ug,pg)}const fg=new Map;function pg(n,e){let t=ze[e];if(t===void 0){const i=fg.get(e);if(i!==void 0)t=ze[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Qa(t)}const mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bl(n){return n.replace(mg,gg)}function gg(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Fl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function _g(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Cc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Pc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ag(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ki:case Ni:e="ENVMAP_TYPE_CUBE";break;case lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vg(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Ni&&(e="ENVMAP_MODE_REFRACTION"),e}function yg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case go:e="ENVMAP_BLENDING_MULTIPLY";break;case hh:e="ENVMAP_BLENDING_MIX";break;case uh:e="ENVMAP_BLENDING_ADD";break}return e}function bg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Sg(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=_g(t),c=Ag(t),d=vg(t),h=yg(t),u=bg(t),p=cg(t),g=dg(r),v=s.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ji).join(`
`),f.length>0&&(f+=`
`)):(m=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),f=[Fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Bn?og("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,ag("linearToOutputTexel",t.outputColorSpace),lg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ji).join(`
`)),a=Qa(a),a=Ul(a,t),a=Ol(a,t),o=Qa(o),o=Ul(o,t),o=Ol(o,t),a=Bl(a),o=Bl(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=M+m+a,b=M+f+o,C=Dl(s,s.VERTEX_SHADER,w),T=Dl(s,s.FRAGMENT_SHADER,b);s.attachShader(v,C),s.attachShader(v,T),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(I){if(n.debug.checkShaderErrors){const B=s.getProgramInfoLog(v)||"",H=s.getShaderInfoLog(C)||"",q=s.getShaderInfoLog(T)||"",j=B.trim(),X=H.trim(),ee=q.trim();let z=!0,se=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,C,T);else{const oe=Nl(s,C,"vertex"),me=Nl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+j+`
`+oe+`
`+me)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(X===""||ee==="")&&(se=!1);se&&(I.diagnostics={runnable:z,programLog:j,vertexShader:{log:X,prefix:m},fragmentShader:{log:ee,prefix:f}})}s.deleteShader(C),s.deleteShader(T),N=new Ks(s,v),E=hg(s,v)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,ng)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ig++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=T,this}let Eg=0;class Mg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new xg(e),t.set(e,i)),i}}class xg{constructor(e){this.id=Eg++,this.code=e,this.usedTimes=0}}function wg(n,e,t,i,s,r,a){const o=new Xc,l=new Mg,c=new Set,d=[],h=s.logarithmicDepthBuffer,u=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,S,I,B,H){const q=B.fog,j=H.geometry,X=E.isMeshStandardMaterial?B.environment:null,ee=(E.isMeshStandardMaterial?t:e).get(E.envMap||X),z=ee&&ee.mapping===lr?ee.image.height:null,se=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const oe=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,me=oe!==void 0?oe.length:0;let De=0;j.morphAttributes.position!==void 0&&(De=1),j.morphAttributes.normal!==void 0&&(De=2),j.morphAttributes.color!==void 0&&(De=3);let Ke,He,Fe,Y;if(se){const Ze=cn[se];Ke=Ze.vertexShader,He=Ze.fragmentShader}else Ke=E.vertexShader,He=E.fragmentShader,l.update(E),Fe=l.getVertexShaderID(E),Y=l.getFragmentShaderID(E);const Z=n.getRenderTarget(),fe=n.state.buffers.depth.getReversed(),Ie=H.isInstancedMesh===!0,Ee=H.isBatchedMesh===!0,qe=!!E.map,Mt=!!E.matcap,R=!!ee,it=!!E.aoMap,Ne=!!E.lightMap,Ce=!!E.bumpMap,_e=!!E.normalMap,st=!!E.displacementMap,Ae=!!E.emissiveMap,Ve=!!E.metalnessMap,_t=!!E.roughnessMap,ct=E.anisotropy>0,x=E.clearcoat>0,_=E.dispersion>0,U=E.iridescence>0,W=E.sheen>0,$=E.transmission>0,G=ct&&!!E.anisotropyMap,Se=x&&!!E.clearcoatMap,ie=x&&!!E.clearcoatNormalMap,ve=x&&!!E.clearcoatRoughnessMap,ye=U&&!!E.iridescenceMap,te=U&&!!E.iridescenceThicknessMap,de=W&&!!E.sheenColorMap,Re=W&&!!E.sheenRoughnessMap,be=!!E.specularMap,le=!!E.specularColorMap,Oe=!!E.specularIntensityMap,L=$&&!!E.transmissionMap,ne=$&&!!E.thicknessMap,re=!!E.gradientMap,ue=!!E.alphaMap,J=E.alphaTest>0,K=!!E.alphaHash,ge=!!E.extensions;let ke=Bn;E.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(ke=n.toneMapping);const tt={shaderID:se,shaderType:E.type,shaderName:E.name,vertexShader:Ke,fragmentShader:He,defines:E.defines,customVertexShaderID:Fe,customFragmentShaderID:Y,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Ee,batchingColor:Ee&&H._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&H.instanceColor!==null,instancingMorph:Ie&&H.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ui,alphaToCoverage:!!E.alphaToCoverage,map:qe,matcap:Mt,envMap:R,envMapMode:R&&ee.mapping,envMapCubeUVHeight:z,aoMap:it,lightMap:Ne,bumpMap:Ce,normalMap:_e,displacementMap:u&&st,emissiveMap:Ae,normalMapObjectSpace:_e&&E.normalMapType===Sh,normalMapTangentSpace:_e&&E.normalMapType===zc,metalnessMap:Ve,roughnessMap:_t,anisotropy:ct,anisotropyMap:G,clearcoat:x,clearcoatMap:Se,clearcoatNormalMap:ie,clearcoatRoughnessMap:ve,dispersion:_,iridescence:U,iridescenceMap:ye,iridescenceThicknessMap:te,sheen:W,sheenColorMap:de,sheenRoughnessMap:Re,specularMap:be,specularColorMap:le,specularIntensityMap:Oe,transmission:$,transmissionMap:L,thicknessMap:ne,gradientMap:re,opaque:E.transparent===!1&&E.blending===Ci&&E.alphaToCoverage===!1,alphaMap:ue,alphaTest:J,alphaHash:K,combine:E.combine,mapUv:qe&&v(E.map.channel),aoMapUv:it&&v(E.aoMap.channel),lightMapUv:Ne&&v(E.lightMap.channel),bumpMapUv:Ce&&v(E.bumpMap.channel),normalMapUv:_e&&v(E.normalMap.channel),displacementMapUv:st&&v(E.displacementMap.channel),emissiveMapUv:Ae&&v(E.emissiveMap.channel),metalnessMapUv:Ve&&v(E.metalnessMap.channel),roughnessMapUv:_t&&v(E.roughnessMap.channel),anisotropyMapUv:G&&v(E.anisotropyMap.channel),clearcoatMapUv:Se&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:ie&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:te&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:de&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Re&&v(E.sheenRoughnessMap.channel),specularMapUv:be&&v(E.specularMap.channel),specularColorMapUv:le&&v(E.specularColorMap.channel),specularIntensityMapUv:Oe&&v(E.specularIntensityMap.channel),transmissionMapUv:L&&v(E.transmissionMap.channel),thicknessMapUv:ne&&v(E.thicknessMap.channel),alphaMapUv:ue&&v(E.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(_e||ct),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!j.attributes.uv&&(qe||ue),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:fe,skinning:H.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:De,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:qe&&E.map.isVideoTexture===!0&&$e.getTransfer(E.map.colorSpace)===Qe,decodeVideoTextureEmissive:Ae&&E.emissiveMap.isVideoTexture===!0&&$e.getTransfer(E.emissiveMap.colorSpace)===Qe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Sn,flipSided:E.side===Lt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ge&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&E.extensions.multiDraw===!0||Ee)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return tt.vertexUv1s=c.has(1),tt.vertexUv2s=c.has(2),tt.vertexUv3s=c.has(3),c.clear(),tt}function f(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const I in E.defines)S.push(I),S.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(M(S,E),w(S,E),S.push(n.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function M(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function w(E,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),E.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),E.push(o.mask)}function b(E){const S=g[E.type];let I;if(S){const B=cn[S];I=Jh.clone(B.uniforms)}else I=E.uniforms;return I}function C(E,S){let I;for(let B=0,H=d.length;B<H;B++){const q=d[B];if(q.cacheKey===S){I=q,++I.usedTimes;break}}return I===void 0&&(I=new Sg(n,S,E,r),d.push(I)),I}function T(E){if(--E.usedTimes===0){const S=d.indexOf(E);d[S]=d[d.length-1],d.pop(),E.destroy()}}function P(E){l.remove(E)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:b,acquireProgram:C,releaseProgram:T,releaseShaderCache:P,programs:d,dispose:N}}function Tg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Rg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Vl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function zl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h,u,p,g,v,m){let f=n[e];return f===void 0?(f={id:h.id,object:h,geometry:u,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},n[e]=f):(f.id=h.id,f.object=h,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=m),e++,f}function o(h,u,p,g,v,m){const f=a(h,u,p,g,v,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(h,u,p,g,v,m){const f=a(h,u,p,g,v,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(h,u){t.length>1&&t.sort(h||Rg),i.length>1&&i.sort(u||Vl),s.length>1&&s.sort(u||Vl)}function d(){for(let h=e,u=n.length;h<u;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:d,sort:c}}function Cg(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new zl,n.set(i,[a])):s>=r.length?(a=new zl,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Pg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ue};break;case"SpotLight":t={position:new O,direction:new O,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function Ig(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Lg=0;function Dg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function kg(n){const e=new Pg,t=Ig(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const s=new O,r=new ut,a=new ut;function o(c){let d=0,h=0,u=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,M=0,w=0,b=0,C=0,T=0,P=0;c.sort(Dg);for(let E=0,S=c.length;E<S;E++){const I=c[E],B=I.color,H=I.intensity,q=I.distance,j=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=B.r*H,h+=B.g*H,u+=B.b*H;else if(I.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(I.sh.coefficients[X],H);P++}else if(I.isDirectionalLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,z=t.get(I);z.shadowIntensity=ee.intensity,z.shadowBias=ee.bias,z.shadowNormalBias=ee.normalBias,z.shadowRadius=ee.radius,z.shadowMapSize=ee.mapSize,i.directionalShadow[p]=z,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=I.shadow.matrix,M++}i.directional[p]=X,p++}else if(I.isSpotLight){const X=e.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(B).multiplyScalar(H),X.distance=q,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,i.spot[v]=X;const ee=I.shadow;if(I.map&&(i.spotLightMap[C]=I.map,C++,ee.updateMatrices(I),I.castShadow&&T++),i.spotLightMatrix[v]=ee.matrix,I.castShadow){const z=t.get(I);z.shadowIntensity=ee.intensity,z.shadowBias=ee.bias,z.shadowNormalBias=ee.normalBias,z.shadowRadius=ee.radius,z.shadowMapSize=ee.mapSize,i.spotShadow[v]=z,i.spotShadowMap[v]=j,b++}v++}else if(I.isRectAreaLight){const X=e.get(I);X.color.copy(B).multiplyScalar(H),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=X,m++}else if(I.isPointLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){const ee=I.shadow,z=t.get(I);z.shadowIntensity=ee.intensity,z.shadowBias=ee.bias,z.shadowNormalBias=ee.normalBias,z.shadowRadius=ee.radius,z.shadowMapSize=ee.mapSize,z.shadowCameraNear=ee.camera.near,z.shadowCameraFar=ee.camera.far,i.pointShadow[g]=z,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=I.shadow.matrix,w++}i.point[g]=X,g++}else if(I.isHemisphereLight){const X=e.get(I);X.skyColor.copy(I.color).multiplyScalar(H),X.groundColor.copy(I.groundColor).multiplyScalar(H),i.hemi[f]=X,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const N=i.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==v||N.rectAreaLength!==m||N.hemiLength!==f||N.numDirectionalShadows!==M||N.numPointShadows!==w||N.numSpotShadows!==b||N.numSpotMaps!==C||N.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=b+C-T,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,N.directionalLength=p,N.pointLength=g,N.spotLength=v,N.rectAreaLength=m,N.hemiLength=f,N.numDirectionalShadows=M,N.numPointShadows=w,N.numSpotShadows=b,N.numSpotMaps=C,N.numLightProbes=P,i.version=Lg++)}function l(c,d){let h=0,u=0,p=0,g=0,v=0;const m=d.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const w=c[f];if(w.isDirectionalLight){const b=i.directional[h];b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),h++}else if(w.isSpotLight){const b=i.spot[p];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(m),p++}else if(w.isRectAreaLight){const b=i.rectArea[g];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(w.width*.5,0,0),b.halfHeight.set(0,w.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const b=i.point[u];b.position.setFromMatrixPosition(w.matrixWorld),b.position.applyMatrix4(m),u++}else if(w.isHemisphereLight){const b=i.hemi[v];b.direction.setFromMatrixPosition(w.matrixWorld),b.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function Gl(n){const e=new kg(n),t=[],i=[];function s(d){c.camera=d,t.length=0,i.length=0}function r(d){t.push(d)}function a(d){i.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Ng(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Gl(n),e.set(s,[o])):r>=a.length?(o=new Gl(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Ug=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Og=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Bg(n,e,t){let i=new To;const s=new Ye,r=new Ye,a=new lt,o=new ou({depthPacking:bh}),l=new lu,c={},d=t.maxTextureSize,h={[un]:Lt,[Lt]:un,[Sn]:Sn},u=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:Ug,fragmentShader:Og}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Tn;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Et(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cc;let f=this.type;this.render=function(T,P,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const E=n.getRenderTarget(),S=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),B=n.state;B.setBlending(On),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const H=f!==bn&&this.type===bn,q=f===bn&&this.type!==bn;for(let j=0,X=T.length;j<X;j++){const ee=T[j],z=ee.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const se=z.getFrameExtents();if(s.multiply(se),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/se.x),s.x=r.x*se.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/se.y),s.y=r.y*se.y,z.mapSize.y=r.y)),z.map===null||H===!0||q===!0){const me=this.type!==bn?{minFilter:Dt,magFilter:Dt}:{};z.map!==null&&z.map.dispose(),z.map=new oi(s.x,s.y,me),z.map.texture.name=ee.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const oe=z.getViewportCount();for(let me=0;me<oe;me++){const De=z.getViewport(me);a.set(r.x*De.x,r.y*De.y,r.x*De.z,r.y*De.w),B.viewport(a),z.updateMatrices(ee,me),i=z.getFrustum(),b(P,N,z.camera,ee,this.type)}z.isPointLightShadow!==!0&&this.type===bn&&M(z,N),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(E,S,I)};function M(T,P){const N=e.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new oi(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,N,u,v,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,N,p,v,null)}function w(T,P,N,E){let S=null;const I=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)S=I;else if(S=N.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=S.uuid,H=P.uuid;let q=c[B];q===void 0&&(q={},c[B]=q);let j=q[H];j===void 0&&(j=S.clone(),q[H]=j,P.addEventListener("dispose",C)),S=j}if(S.visible=P.visible,S.wireframe=P.wireframe,E===bn?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:h[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,N.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const B=n.properties.get(S);B.light=N}return S}function b(T,P,N,E,S){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===bn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const H=e.update(T),q=T.material;if(Array.isArray(q)){const j=H.groups;for(let X=0,ee=j.length;X<ee;X++){const z=j[X],se=q[z.materialIndex];if(se&&se.visible){const oe=w(T,se,E,S);T.onBeforeShadow(n,T,P,N,H,oe,z),n.renderBufferDirect(N,null,H,oe,T,z),T.onAfterShadow(n,T,P,N,H,oe,z)}}}else if(q.visible){const j=w(T,q,E,S);T.onBeforeShadow(n,T,P,N,H,j,null),n.renderBufferDirect(N,null,H,j,T,null),T.onAfterShadow(n,T,P,N,H,j,null)}}const B=T.children;for(let H=0,q=B.length;H<q;H++)b(B[H],P,N,E,S)}function C(T){T.target.removeEventListener("dispose",C);for(const N in c){const E=c[N],S=T.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}const Fg={[fa]:pa,[ma]:Aa,[ga]:va,[Di]:_a,[pa]:fa,[Aa]:ma,[va]:ga,[_a]:Di};function Vg(n,e){function t(){let L=!1;const ne=new lt;let re=null;const ue=new lt(0,0,0,0);return{setMask:function(J){re!==J&&!L&&(n.colorMask(J,J,J,J),re=J)},setLocked:function(J){L=J},setClear:function(J,K,ge,ke,tt){tt===!0&&(J*=ke,K*=ke,ge*=ke),ne.set(J,K,ge,ke),ue.equals(ne)===!1&&(n.clearColor(J,K,ge,ke),ue.copy(ne))},reset:function(){L=!1,re=null,ue.set(-1,0,0,0)}}}function i(){let L=!1,ne=!1,re=null,ue=null,J=null;return{setReversed:function(K){if(ne!==K){const ge=e.get("EXT_clip_control");K?ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.ZERO_TO_ONE_EXT):ge.clipControlEXT(ge.LOWER_LEFT_EXT,ge.NEGATIVE_ONE_TO_ONE_EXT),ne=K;const ke=J;J=null,this.setClear(ke)}},getReversed:function(){return ne},setTest:function(K){K?Z(n.DEPTH_TEST):fe(n.DEPTH_TEST)},setMask:function(K){re!==K&&!L&&(n.depthMask(K),re=K)},setFunc:function(K){if(ne&&(K=Fg[K]),ue!==K){switch(K){case fa:n.depthFunc(n.NEVER);break;case pa:n.depthFunc(n.ALWAYS);break;case ma:n.depthFunc(n.LESS);break;case Di:n.depthFunc(n.LEQUAL);break;case ga:n.depthFunc(n.EQUAL);break;case _a:n.depthFunc(n.GEQUAL);break;case Aa:n.depthFunc(n.GREATER);break;case va:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=K}},setLocked:function(K){L=K},setClear:function(K){J!==K&&(ne&&(K=1-K),n.clearDepth(K),J=K)},reset:function(){L=!1,re=null,ue=null,J=null,ne=!1}}}function s(){let L=!1,ne=null,re=null,ue=null,J=null,K=null,ge=null,ke=null,tt=null;return{setTest:function(Ze){L||(Ze?Z(n.STENCIL_TEST):fe(n.STENCIL_TEST))},setMask:function(Ze){ne!==Ze&&!L&&(n.stencilMask(Ze),ne=Ze)},setFunc:function(Ze,pn,on){(re!==Ze||ue!==pn||J!==on)&&(n.stencilFunc(Ze,pn,on),re=Ze,ue=pn,J=on)},setOp:function(Ze,pn,on){(K!==Ze||ge!==pn||ke!==on)&&(n.stencilOp(Ze,pn,on),K=Ze,ge=pn,ke=on)},setLocked:function(Ze){L=Ze},setClear:function(Ze){tt!==Ze&&(n.clearStencil(Ze),tt=Ze)},reset:function(){L=!1,ne=null,re=null,ue=null,J=null,K=null,ge=null,ke=null,tt=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let d={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,M=null,w=null,b=null,C=null,T=null,P=new Ue(0,0,0),N=0,E=!1,S=null,I=null,B=null,H=null,q=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ee=0;const z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(z)[1]),X=ee>=1):z.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),X=ee>=2);let se=null,oe={};const me=n.getParameter(n.SCISSOR_BOX),De=n.getParameter(n.VIEWPORT),Ke=new lt().fromArray(me),He=new lt().fromArray(De);function Fe(L,ne,re,ue){const J=new Uint8Array(4),K=n.createTexture();n.bindTexture(L,K),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ge=0;ge<re;ge++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ne,0,n.RGBA,1,1,ue,0,n.RGBA,n.UNSIGNED_BYTE,J):n.texImage2D(ne+ge,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,J);return K}const Y={};Y[n.TEXTURE_2D]=Fe(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=Fe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=Fe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=Fe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(n.DEPTH_TEST),a.setFunc(Di),Ce(!1),_e(Yo),Z(n.CULL_FACE),it(On);function Z(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function fe(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function Ie(L,ne){return h[L]!==ne?(n.bindFramebuffer(L,ne),h[L]=ne,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ne),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ee(L,ne){let re=p,ue=!1;if(L){re=u.get(ne),re===void 0&&(re=[],u.set(ne,re));const J=L.textures;if(re.length!==J.length||re[0]!==n.COLOR_ATTACHMENT0){for(let K=0,ge=J.length;K<ge;K++)re[K]=n.COLOR_ATTACHMENT0+K;re.length=J.length,ue=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,ue=!0);ue&&n.drawBuffers(re)}function qe(L){return g!==L?(n.useProgram(L),g=L,!0):!1}const Mt={[ni]:n.FUNC_ADD,[Kd]:n.FUNC_SUBTRACT,[jd]:n.FUNC_REVERSE_SUBTRACT};Mt[$d]=n.MIN,Mt[Zd]=n.MAX;const R={[Jd]:n.ZERO,[Qd]:n.ONE,[eh]:n.SRC_COLOR,[ha]:n.SRC_ALPHA,[ah]:n.SRC_ALPHA_SATURATE,[sh]:n.DST_COLOR,[nh]:n.DST_ALPHA,[th]:n.ONE_MINUS_SRC_COLOR,[ua]:n.ONE_MINUS_SRC_ALPHA,[rh]:n.ONE_MINUS_DST_COLOR,[ih]:n.ONE_MINUS_DST_ALPHA,[oh]:n.CONSTANT_COLOR,[lh]:n.ONE_MINUS_CONSTANT_COLOR,[ch]:n.CONSTANT_ALPHA,[dh]:n.ONE_MINUS_CONSTANT_ALPHA};function it(L,ne,re,ue,J,K,ge,ke,tt,Ze){if(L===On){v===!0&&(fe(n.BLEND),v=!1);return}if(v===!1&&(Z(n.BLEND),v=!0),L!==qd){if(L!==m||Ze!==E){if((f!==ni||b!==ni)&&(n.blendEquation(n.FUNC_ADD),f=ni,b=ni),Ze)switch(L){case Ci:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qo:n.blendFunc(n.ONE,n.ONE);break;case Ko:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ci:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ko:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,w=null,C=null,T=null,P.set(0,0,0),N=0,m=L,E=Ze}return}J=J||ne,K=K||re,ge=ge||ue,(ne!==f||J!==b)&&(n.blendEquationSeparate(Mt[ne],Mt[J]),f=ne,b=J),(re!==M||ue!==w||K!==C||ge!==T)&&(n.blendFuncSeparate(R[re],R[ue],R[K],R[ge]),M=re,w=ue,C=K,T=ge),(ke.equals(P)===!1||tt!==N)&&(n.blendColor(ke.r,ke.g,ke.b,tt),P.copy(ke),N=tt),m=L,E=!1}function Ne(L,ne){L.side===Sn?fe(n.CULL_FACE):Z(n.CULL_FACE);let re=L.side===Lt;ne&&(re=!re),Ce(re),L.blending===Ci&&L.transparent===!1?it(On):it(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const ue=L.stencilWrite;o.setTest(ue),ue&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ae(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(L){S!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),S=L)}function _e(L){L!==Xd?(Z(n.CULL_FACE),L!==I&&(L===Yo?n.cullFace(n.BACK):L===Yd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):fe(n.CULL_FACE),I=L}function st(L){L!==B&&(X&&n.lineWidth(L),B=L)}function Ae(L,ne,re){L?(Z(n.POLYGON_OFFSET_FILL),(H!==ne||q!==re)&&(n.polygonOffset(ne,re),H=ne,q=re)):fe(n.POLYGON_OFFSET_FILL)}function Ve(L){L?Z(n.SCISSOR_TEST):fe(n.SCISSOR_TEST)}function _t(L){L===void 0&&(L=n.TEXTURE0+j-1),se!==L&&(n.activeTexture(L),se=L)}function ct(L,ne,re){re===void 0&&(se===null?re=n.TEXTURE0+j-1:re=se);let ue=oe[re];ue===void 0&&(ue={type:void 0,texture:void 0},oe[re]=ue),(ue.type!==L||ue.texture!==ne)&&(se!==re&&(n.activeTexture(re),se=re),n.bindTexture(L,ne||Y[L]),ue.type=L,ue.texture=ne)}function x(){const L=oe[se];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function W(){try{n.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $(){try{n.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{n.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{n.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{n.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{n.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{n.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(L){Ke.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Ke.copy(L))}function Re(L){He.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),He.copy(L))}function be(L,ne){let re=c.get(ne);re===void 0&&(re=new WeakMap,c.set(ne,re));let ue=re.get(L);ue===void 0&&(ue=n.getUniformBlockIndex(ne,L.name),re.set(L,ue))}function le(L,ne){const ue=c.get(ne).get(L);l.get(ne)!==ue&&(n.uniformBlockBinding(ne,ue,L.__bindingPointIndex),l.set(ne,ue))}function Oe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},se=null,oe={},h={},u=new WeakMap,p=[],g=null,v=!1,m=null,f=null,M=null,w=null,b=null,C=null,T=null,P=new Ue(0,0,0),N=0,E=!1,S=null,I=null,B=null,H=null,q=null,Ke.set(0,0,n.canvas.width,n.canvas.height),He.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:fe,bindFramebuffer:Ie,drawBuffers:Ee,useProgram:qe,setBlending:it,setMaterial:Ne,setFlipSided:Ce,setCullFace:_e,setLineWidth:st,setPolygonOffset:Ae,setScissorTest:Ve,activeTexture:_t,bindTexture:ct,unbindTexture:x,compressedTexImage2D:_,compressedTexImage3D:U,texImage2D:ye,texImage3D:te,updateUBOMapping:be,uniformBlockBinding:le,texStorage2D:ie,texStorage3D:ve,texSubImage2D:W,texSubImage3D:$,compressedTexSubImage2D:G,compressedTexSubImage3D:Se,scissor:de,viewport:Re,reset:Oe}}function zg(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,d=new WeakMap;let h;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,_){return p?new OffscreenCanvas(x,_):er("canvas")}function v(x,_,U){let W=1;const $=ct(x);if(($.width>U||$.height>U)&&(W=U/Math.max($.width,$.height)),W<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const G=Math.floor(W*$.width),Se=Math.floor(W*$.height);h===void 0&&(h=g(G,Se));const ie=_?g(G,Se):h;return ie.width=G,ie.height=Se,ie.getContext("2d").drawImage(x,0,0,G,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+G+"x"+Se+")."),ie}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),x;return x}function m(x){return x.generateMipmaps}function f(x){n.generateMipmap(x)}function M(x){return x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?n.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(x,_,U,W,$=!1){if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let G=_;if(_===n.RED&&(U===n.FLOAT&&(G=n.R32F),U===n.HALF_FLOAT&&(G=n.R16F),U===n.UNSIGNED_BYTE&&(G=n.R8)),_===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.R8UI),U===n.UNSIGNED_SHORT&&(G=n.R16UI),U===n.UNSIGNED_INT&&(G=n.R32UI),U===n.BYTE&&(G=n.R8I),U===n.SHORT&&(G=n.R16I),U===n.INT&&(G=n.R32I)),_===n.RG&&(U===n.FLOAT&&(G=n.RG32F),U===n.HALF_FLOAT&&(G=n.RG16F),U===n.UNSIGNED_BYTE&&(G=n.RG8)),_===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.RG8UI),U===n.UNSIGNED_SHORT&&(G=n.RG16UI),U===n.UNSIGNED_INT&&(G=n.RG32UI),U===n.BYTE&&(G=n.RG8I),U===n.SHORT&&(G=n.RG16I),U===n.INT&&(G=n.RG32I)),_===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.RGB8UI),U===n.UNSIGNED_SHORT&&(G=n.RGB16UI),U===n.UNSIGNED_INT&&(G=n.RGB32UI),U===n.BYTE&&(G=n.RGB8I),U===n.SHORT&&(G=n.RGB16I),U===n.INT&&(G=n.RGB32I)),_===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),U===n.UNSIGNED_INT&&(G=n.RGBA32UI),U===n.BYTE&&(G=n.RGBA8I),U===n.SHORT&&(G=n.RGBA16I),U===n.INT&&(G=n.RGBA32I)),_===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(G=n.R11F_G11F_B10F)),_===n.RGBA){const Se=$?Js:$e.getTransfer(W);U===n.FLOAT&&(G=n.RGBA32F),U===n.HALF_FLOAT&&(G=n.RGBA16F),U===n.UNSIGNED_BYTE&&(G=Se===Qe?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function b(x,_){let U;return x?_===null||_===ai||_===ns?U=n.DEPTH24_STENCIL8:_===Mn?U=n.DEPTH32F_STENCIL8:_===ts&&(U=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ai||_===ns?U=n.DEPTH_COMPONENT24:_===Mn?U=n.DEPTH_COMPONENT32F:_===ts&&(U=n.DEPTH_COMPONENT16),U}function C(x,_){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==Dt&&x.minFilter!==Zt?Math.log2(Math.max(_.width,_.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?_.mipmaps.length:1}function T(x){const _=x.target;_.removeEventListener("dispose",T),N(_),_.isVideoTexture&&d.delete(_)}function P(x){const _=x.target;_.removeEventListener("dispose",P),S(_)}function N(x){const _=i.get(x);if(_.__webglInit===void 0)return;const U=x.source,W=u.get(U);if(W){const $=W[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&E(x),Object.keys(W).length===0&&u.delete(U)}i.remove(x)}function E(x){const _=i.get(x);n.deleteTexture(_.__webglTexture);const U=x.source,W=u.get(U);delete W[_.__cacheKey],a.memory.textures--}function S(x){const _=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let $=0;$<_.__webglFramebuffer[W].length;$++)n.deleteFramebuffer(_.__webglFramebuffer[W][$]);else n.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)n.deleteFramebuffer(_.__webglFramebuffer[W]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=x.textures;for(let W=0,$=U.length;W<$;W++){const G=i.get(U[W]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),a.memory.textures--),i.remove(U[W])}i.remove(x)}let I=0;function B(){I=0}function H(){const x=I;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),I+=1,x}function q(x){const _=[];return _.push(x.wrapS),_.push(x.wrapT),_.push(x.wrapR||0),_.push(x.magFilter),_.push(x.minFilter),_.push(x.anisotropy),_.push(x.internalFormat),_.push(x.format),_.push(x.type),_.push(x.generateMipmaps),_.push(x.premultiplyAlpha),_.push(x.flipY),_.push(x.unpackAlignment),_.push(x.colorSpace),_.join()}function j(x,_){const U=i.get(x);if(x.isVideoTexture&&Ve(x),x.isRenderTargetTexture===!1&&x.isExternalTexture!==!0&&x.version>0&&U.__version!==x.version){const W=x.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(U,x,_);return}}else x.isExternalTexture&&(U.__webglTexture=x.sourceTexture?x.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+_)}function X(x,_){const U=i.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&U.__version!==x.version){Y(U,x,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+_)}function ee(x,_){const U=i.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&U.__version!==x.version){Y(U,x,_);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+_)}function z(x,_){const U=i.get(x);if(x.version>0&&U.__version!==x.version){Z(U,x,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+_)}const se={[Sa]:n.REPEAT,[En]:n.CLAMP_TO_EDGE,[Ea]:n.MIRRORED_REPEAT},oe={[Dt]:n.NEAREST,[vh]:n.NEAREST_MIPMAP_NEAREST,[gs]:n.NEAREST_MIPMAP_LINEAR,[Zt]:n.LINEAR,[_r]:n.LINEAR_MIPMAP_NEAREST,[si]:n.LINEAR_MIPMAP_LINEAR},me={[Eh]:n.NEVER,[Ch]:n.ALWAYS,[Mh]:n.LESS,[Gc]:n.LEQUAL,[xh]:n.EQUAL,[Rh]:n.GEQUAL,[wh]:n.GREATER,[Th]:n.NOTEQUAL};function De(x,_){if(_.type===Mn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Zt||_.magFilter===_r||_.magFilter===gs||_.magFilter===si||_.minFilter===Zt||_.minFilter===_r||_.minFilter===gs||_.minFilter===si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(x,n.TEXTURE_WRAP_S,se[_.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,se[_.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,se[_.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,oe[_.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,oe[_.minFilter]),_.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,me[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Dt||_.minFilter!==gs&&_.minFilter!==si||_.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(x,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ke(x,_){let U=!1;x.__webglInit===void 0&&(x.__webglInit=!0,_.addEventListener("dispose",T));const W=_.source;let $=u.get(W);$===void 0&&($={},u.set(W,$));const G=q(_);if(G!==x.__cacheKey){$[G]===void 0&&($[G]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,U=!0),$[G].usedTimes++;const Se=$[x.__cacheKey];Se!==void 0&&($[x.__cacheKey].usedTimes--,Se.usedTimes===0&&E(_)),x.__cacheKey=G,x.__webglTexture=$[G].texture}return U}function He(x,_,U){return Math.floor(Math.floor(x/U)/_)}function Fe(x,_,U,W){const G=x.updateRanges;if(G.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,U,W,_.data);else{G.sort((te,de)=>te.start-de.start);let Se=0;for(let te=1;te<G.length;te++){const de=G[Se],Re=G[te],be=de.start+de.count,le=He(Re.start,_.width,4),Oe=He(de.start,_.width,4);Re.start<=be+1&&le===Oe&&He(Re.start+Re.count-1,_.width,4)===le?de.count=Math.max(de.count,Re.start+Re.count-de.start):(++Se,G[Se]=Re)}G.length=Se+1;const ie=n.getParameter(n.UNPACK_ROW_LENGTH),ve=n.getParameter(n.UNPACK_SKIP_PIXELS),ye=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let te=0,de=G.length;te<de;te++){const Re=G[te],be=Math.floor(Re.start/4),le=Math.ceil(Re.count/4),Oe=be%_.width,L=Math.floor(be/_.width),ne=le,re=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Oe),n.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,Oe,L,ne,re,U,W,_.data)}x.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ie),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ve),n.pixelStorei(n.UNPACK_SKIP_ROWS,ye)}}function Y(x,_,U){let W=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=n.TEXTURE_3D);const $=Ke(x,_),G=_.source;t.bindTexture(W,x.__webglTexture,n.TEXTURE0+U);const Se=i.get(G);if(G.version!==Se.__version||$===!0){t.activeTexture(n.TEXTURE0+U);const ie=$e.getPrimaries($e.workingColorSpace),ve=_.colorSpace===Un?null:$e.getPrimaries(_.colorSpace),ye=_.colorSpace===Un||ie===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let te=v(_.image,!1,s.maxTextureSize);te=_t(_,te);const de=r.convert(_.format,_.colorSpace),Re=r.convert(_.type);let be=w(_.internalFormat,de,Re,_.colorSpace,_.isVideoTexture);De(W,_);let le;const Oe=_.mipmaps,L=_.isVideoTexture!==!0,ne=Se.__version===void 0||$===!0,re=G.dataReady,ue=C(_,te);if(_.isDepthTexture)be=b(_.format===ss,_.type),ne&&(L?t.texStorage2D(n.TEXTURE_2D,1,be,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,be,te.width,te.height,0,de,Re,null));else if(_.isDataTexture)if(Oe.length>0){L&&ne&&t.texStorage2D(n.TEXTURE_2D,ue,be,Oe[0].width,Oe[0].height);for(let J=0,K=Oe.length;J<K;J++)le=Oe[J],L?re&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,le.width,le.height,de,Re,le.data):t.texImage2D(n.TEXTURE_2D,J,be,le.width,le.height,0,de,Re,le.data);_.generateMipmaps=!1}else L?(ne&&t.texStorage2D(n.TEXTURE_2D,ue,be,te.width,te.height),re&&Fe(_,te,de,Re)):t.texImage2D(n.TEXTURE_2D,0,be,te.width,te.height,0,de,Re,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&ne&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,be,Oe[0].width,Oe[0].height,te.depth);for(let J=0,K=Oe.length;J<K;J++)if(le=Oe[J],_.format!==rn)if(de!==null)if(L){if(re)if(_.layerUpdates.size>0){const ge=Al(le.width,le.height,_.format,_.type);for(const ke of _.layerUpdates){const tt=le.data.subarray(ke*ge/le.data.BYTES_PER_ELEMENT,(ke+1)*ge/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,ke,le.width,le.height,1,de,tt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,te.depth,de,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,be,le.width,le.height,te.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?re&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,le.width,le.height,te.depth,de,Re,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,be,le.width,le.height,te.depth,0,de,Re,le.data)}else{L&&ne&&t.texStorage2D(n.TEXTURE_2D,ue,be,Oe[0].width,Oe[0].height);for(let J=0,K=Oe.length;J<K;J++)le=Oe[J],_.format!==rn?de!==null?L?re&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,le.width,le.height,de,le.data):t.compressedTexImage2D(n.TEXTURE_2D,J,be,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?re&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,le.width,le.height,de,Re,le.data):t.texImage2D(n.TEXTURE_2D,J,be,le.width,le.height,0,de,Re,le.data)}else if(_.isDataArrayTexture)if(L){if(ne&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,be,te.width,te.height,te.depth),re)if(_.layerUpdates.size>0){const J=Al(te.width,te.height,_.format,_.type);for(const K of _.layerUpdates){const ge=te.data.subarray(K*J/te.data.BYTES_PER_ELEMENT,(K+1)*J/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,K,te.width,te.height,1,de,Re,ge)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,de,Re,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,be,te.width,te.height,te.depth,0,de,Re,te.data);else if(_.isData3DTexture)L?(ne&&t.texStorage3D(n.TEXTURE_3D,ue,be,te.width,te.height,te.depth),re&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,de,Re,te.data)):t.texImage3D(n.TEXTURE_3D,0,be,te.width,te.height,te.depth,0,de,Re,te.data);else if(_.isFramebufferTexture){if(ne)if(L)t.texStorage2D(n.TEXTURE_2D,ue,be,te.width,te.height);else{let J=te.width,K=te.height;for(let ge=0;ge<ue;ge++)t.texImage2D(n.TEXTURE_2D,ge,be,J,K,0,de,Re,null),J>>=1,K>>=1}}else if(Oe.length>0){if(L&&ne){const J=ct(Oe[0]);t.texStorage2D(n.TEXTURE_2D,ue,be,J.width,J.height)}for(let J=0,K=Oe.length;J<K;J++)le=Oe[J],L?re&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,de,Re,le):t.texImage2D(n.TEXTURE_2D,J,be,de,Re,le);_.generateMipmaps=!1}else if(L){if(ne){const J=ct(te);t.texStorage2D(n.TEXTURE_2D,ue,be,J.width,J.height)}re&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Re,te)}else t.texImage2D(n.TEXTURE_2D,0,be,de,Re,te);m(_)&&f(W),Se.__version=G.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function Z(x,_,U){if(_.image.length!==6)return;const W=Ke(x,_),$=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+U);const G=i.get($);if($.version!==G.__version||W===!0){t.activeTexture(n.TEXTURE0+U);const Se=$e.getPrimaries($e.workingColorSpace),ie=_.colorSpace===Un?null:$e.getPrimaries(_.colorSpace),ve=_.colorSpace===Un||Se===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const ye=_.isCompressedTexture||_.image[0].isCompressedTexture,te=_.image[0]&&_.image[0].isDataTexture,de=[];for(let K=0;K<6;K++)!ye&&!te?de[K]=v(_.image[K],!0,s.maxCubemapSize):de[K]=te?_.image[K].image:_.image[K],de[K]=_t(_,de[K]);const Re=de[0],be=r.convert(_.format,_.colorSpace),le=r.convert(_.type),Oe=w(_.internalFormat,be,le,_.colorSpace),L=_.isVideoTexture!==!0,ne=G.__version===void 0||W===!0,re=$.dataReady;let ue=C(_,Re);De(n.TEXTURE_CUBE_MAP,_);let J;if(ye){L&&ne&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Oe,Re.width,Re.height);for(let K=0;K<6;K++){J=de[K].mipmaps;for(let ge=0;ge<J.length;ge++){const ke=J[ge];_.format!==rn?be!==null?L?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,ke.width,ke.height,be,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,Oe,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,0,0,ke.width,ke.height,be,le,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge,Oe,ke.width,ke.height,0,be,le,ke.data)}}}else{if(J=_.mipmaps,L&&ne){J.length>0&&ue++;const K=ct(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Oe,K.width,K.height)}for(let K=0;K<6;K++)if(te){L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,de[K].width,de[K].height,be,le,de[K].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Oe,de[K].width,de[K].height,0,be,le,de[K].data);for(let ge=0;ge<J.length;ge++){const tt=J[ge].image[K].image;L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,tt.width,tt.height,be,le,tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,Oe,tt.width,tt.height,0,be,le,tt.data)}}else{L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,be,le,de[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Oe,be,le,de[K]);for(let ge=0;ge<J.length;ge++){const ke=J[ge];L?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,0,0,be,le,ke.image[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,ge+1,Oe,be,le,ke.image[K])}}}m(_)&&f(n.TEXTURE_CUBE_MAP),G.__version=$.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function fe(x,_,U,W,$,G){const Se=r.convert(U.format,U.colorSpace),ie=r.convert(U.type),ve=w(U.internalFormat,Se,ie,U.colorSpace),ye=i.get(_),te=i.get(U);if(te.__renderTarget=_,!ye.__hasExternalTextures){const de=Math.max(1,_.width>>G),Re=Math.max(1,_.height>>G);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,G,ve,de,Re,_.depth,0,Se,ie,null):t.texImage2D($,G,ve,de,Re,0,Se,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,x),Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,$,te.__webglTexture,0,st(_)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,$,te.__webglTexture,G),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(x,_,U){if(n.bindRenderbuffer(n.RENDERBUFFER,x),_.depthBuffer){const W=_.depthTexture,$=W&&W.isDepthTexture?W.type:null,G=b(_.stencilBuffer,$),Se=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=st(_);Ae(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,G,_.width,_.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,G,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,G,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Se,n.RENDERBUFFER,x)}else{const W=_.textures;for(let $=0;$<W.length;$++){const G=W[$],Se=r.convert(G.format,G.colorSpace),ie=r.convert(G.type),ve=w(G.internalFormat,Se,ie,G.colorSpace),ye=st(_);U&&Ae(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,ve,_.width,_.height):Ae(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ye,ve,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ve,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ee(x,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,x),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=i.get(_.depthTexture);W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j(_.depthTexture,0);const $=W.__webglTexture,G=st(_);if(_.depthTexture.format===is)Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(_.depthTexture.format===ss)Ae(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function qe(x){const _=i.get(x),U=x.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==x.depthTexture){const W=x.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",$)};W.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=W}if(x.depthTexture&&!_.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const W=x.texture.mipmaps;W&&W.length>0?Ee(_.__webglFramebuffer[0],x):Ee(_.__webglFramebuffer,x)}else if(U){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=n.createRenderbuffer(),Ie(_.__webglDepthbuffer[W],x,!1);else{const $=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=_.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,G)}}else{const W=x.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Ie(_.__webglDepthbuffer,x,!1);else{const $=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,G)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Mt(x,_,U){const W=i.get(x);_!==void 0&&fe(W.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&qe(x)}function R(x){const _=x.texture,U=i.get(x),W=i.get(_);x.addEventListener("dispose",P);const $=x.textures,G=x.isWebGLCubeRenderTarget===!0,Se=$.length>1;if(Se||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=_.version,a.memory.textures++),G){U.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[ie]=[];for(let ve=0;ve<_.mipmaps.length;ve++)U.__webglFramebuffer[ie][ve]=n.createFramebuffer()}else U.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let ie=0;ie<_.mipmaps.length;ie++)U.__webglFramebuffer[ie]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(Se)for(let ie=0,ve=$.length;ie<ve;ie++){const ye=i.get($[ie]);ye.__webglTexture===void 0&&(ye.__webglTexture=n.createTexture(),a.memory.textures++)}if(x.samples>0&&Ae(x)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ie=0;ie<$.length;ie++){const ve=$[ie];U.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[ie]);const ye=r.convert(ve.format,ve.colorSpace),te=r.convert(ve.type),de=w(ve.internalFormat,ye,te,ve.colorSpace,x.isXRRenderTarget===!0),Re=st(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,de,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,U.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Ie(U.__webglDepthRenderbuffer,x,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),De(n.TEXTURE_CUBE_MAP,_);for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)fe(U.__webglFramebuffer[ie][ve],x,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve);else fe(U.__webglFramebuffer[ie],x,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(_)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ie=0,ve=$.length;ie<ve;ie++){const ye=$[ie],te=i.get(ye);let de=n.TEXTURE_2D;(x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(de=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,te.__webglTexture),De(de,ye),fe(U.__webglFramebuffer,x,ye,n.COLOR_ATTACHMENT0+ie,de,0),m(ye)&&f(de)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ie=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,W.__webglTexture),De(ie,_),_.mipmaps&&_.mipmaps.length>0)for(let ve=0;ve<_.mipmaps.length;ve++)fe(U.__webglFramebuffer[ve],x,_,n.COLOR_ATTACHMENT0,ie,ve);else fe(U.__webglFramebuffer,x,_,n.COLOR_ATTACHMENT0,ie,0);m(_)&&f(ie),t.unbindTexture()}x.depthBuffer&&qe(x)}function it(x){const _=x.textures;for(let U=0,W=_.length;U<W;U++){const $=_[U];if(m($)){const G=M(x),Se=i.get($).__webglTexture;t.bindTexture(G,Se),f(G),t.unbindTexture()}}}const Ne=[],Ce=[];function _e(x){if(x.samples>0){if(Ae(x)===!1){const _=x.textures,U=x.width,W=x.height;let $=n.COLOR_BUFFER_BIT;const G=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=i.get(x),ie=_.length>1;if(ie)for(let ye=0;ye<_.length;ye++)t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const ve=x.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ye=0;ye<_.length;ye++){if(x.resolveDepthBuffer&&(x.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const te=i.get(_[ye]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,U,W,0,0,U,W,$,n.NEAREST),l===!0&&(Ne.length=0,Ce.length=0,Ne.push(n.COLOR_ATTACHMENT0+ye),x.depthBuffer&&x.resolveDepthBuffer===!1&&(Ne.push(G),Ce.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ce)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let ye=0;ye<_.length;ye++){t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const te=i.get(_[ye]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const _=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function st(x){return Math.min(s.maxSamples,x.samples)}function Ae(x){const _=i.get(x);return x.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ve(x){const _=a.render.frame;d.get(x)!==_&&(d.set(x,_),x.update())}function _t(x,_){const U=x.colorSpace,W=x.format,$=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||U!==Ui&&U!==Un&&($e.getTransfer(U)===Qe?(W!==rn||$!==fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),_}function ct(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=ee,this.setTextureCube=z,this.rebindTextures=Mt,this.setupRenderTarget=R,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=Ae}function Gg(n,e){function t(i,s=Un){let r;const a=$e.getTransfer(s);if(i===fn)return n.UNSIGNED_BYTE;if(i===Ao)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Nc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Uc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Dc)return n.BYTE;if(i===kc)return n.SHORT;if(i===ts)return n.UNSIGNED_SHORT;if(i===_o)return n.INT;if(i===ai)return n.UNSIGNED_INT;if(i===Mn)return n.FLOAT;if(i===ds)return n.HALF_FLOAT;if(i===Oc)return n.ALPHA;if(i===Bc)return n.RGB;if(i===rn)return n.RGBA;if(i===is)return n.DEPTH_COMPONENT;if(i===ss)return n.DEPTH_STENCIL;if(i===Fc)return n.RED;if(i===yo)return n.RED_INTEGER;if(i===Vc)return n.RG;if(i===bo)return n.RG_INTEGER;if(i===So)return n.RGBA_INTEGER;if(i===Ws||i===Xs||i===Ys||i===qs)if(a===Qe)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ws)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ws)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Xs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ys)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===qs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ma||i===xa||i===wa||i===Ta)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ma)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ra||i===Ca||i===Pa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ra||i===Ca)return a===Qe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Pa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ia||i===La||i===Da||i===ka||i===Na||i===Ua||i===Oa||i===Ba||i===Fa||i===Va||i===za||i===Ga||i===Ha||i===Wa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ia)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===La)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Da)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ka)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Na)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ua)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Oa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ba)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Va)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===za)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ga)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ha)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Wa)return a===Qe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Xa||i===Ya||i===qa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Xa)return a===Qe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ka||i===ja||i===$a||i===Za)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ka)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Za)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ns?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Hg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Qc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new wn({vertexShader:Hg,fragmentShader:Wg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new cr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yg extends zi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",m=new Xg,f={},M=t.getContextAttributes();let w=null,b=null;const C=[],T=[],P=new Ye;let N=null;const E=new It;E.viewport=new lt;const S=new It;S.viewport=new lt;const I=[E,S],B=new uu;let H=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Z=C[Y];return Z===void 0&&(Z=new Vr,C[Y]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(Y){let Z=C[Y];return Z===void 0&&(Z=new Vr,C[Y]=Z),Z.getGripSpace()},this.getHand=function(Y){let Z=C[Y];return Z===void 0&&(Z=new Vr,C[Y]=Z),Z.getHandSpace()};function j(Y){const Z=T.indexOf(Y.inputSource);if(Z===-1)return;const fe=C[Z];fe!==void 0&&(fe.update(Y.inputSource,Y.frame,c||a),fe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",ee);for(let Y=0;Y<C.length;Y++){const Z=T[Y];Z!==null&&(T[Y]=null,C[Y].disconnect(Z))}H=null,q=null,m.reset();for(const Y in f)delete f[Y];e.setRenderTarget(w),p=null,u=null,h=null,s=null,b=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(N),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",X),s.addEventListener("inputsourceschange",ee),M.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Ie=null,Ee=null;M.depth&&(Ee=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=M.stencil?ss:is,Ie=M.stencil?ns:ai);const qe={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(qe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new oi(u.textureWidth,u.textureHeight,{format:rn,type:fn,depthTexture:new Jc(u.textureWidth,u.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const fe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,fe),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new oi(p.framebufferWidth,p.framebufferHeight,{format:rn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ee(Y){for(let Z=0;Z<Y.removed.length;Z++){const fe=Y.removed[Z],Ie=T.indexOf(fe);Ie>=0&&(T[Ie]=null,C[Ie].disconnect(fe))}for(let Z=0;Z<Y.added.length;Z++){const fe=Y.added[Z];let Ie=T.indexOf(fe);if(Ie===-1){for(let qe=0;qe<C.length;qe++)if(qe>=T.length){T.push(fe),Ie=qe;break}else if(T[qe]===null){T[qe]=fe,Ie=qe;break}if(Ie===-1)break}const Ee=C[Ie];Ee&&Ee.connect(fe)}}const z=new O,se=new O;function oe(Y,Z,fe){z.setFromMatrixPosition(Z.matrixWorld),se.setFromMatrixPosition(fe.matrixWorld);const Ie=z.distanceTo(se),Ee=Z.projectionMatrix.elements,qe=fe.projectionMatrix.elements,Mt=Ee[14]/(Ee[10]-1),R=Ee[14]/(Ee[10]+1),it=(Ee[9]+1)/Ee[5],Ne=(Ee[9]-1)/Ee[5],Ce=(Ee[8]-1)/Ee[0],_e=(qe[8]+1)/qe[0],st=Mt*Ce,Ae=Mt*_e,Ve=Ie/(-Ce+_e),_t=Ve*-Ce;if(Z.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(_t),Y.translateZ(Ve),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ee[10]===-1)Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const ct=Mt+Ve,x=R+Ve,_=st-_t,U=Ae+(Ie-_t),W=it*R/x*ct,$=Ne*R/x*ct;Y.projectionMatrix.makePerspective(_,U,W,$,ct,x),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function me(Y,Z){Z===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Z.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Z=Y.near,fe=Y.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),B.near=S.near=E.near=Z,B.far=S.far=E.far=fe,(H!==B.near||q!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),H=B.near,q=B.far),B.layers.mask=Y.layers.mask|6,E.layers.mask=B.layers.mask&3,S.layers.mask=B.layers.mask&5;const Ie=Y.parent,Ee=B.cameras;me(B,Ie);for(let qe=0;qe<Ee.length;qe++)me(Ee[qe],Ie);Ee.length===2?oe(B,E,S):B.projectionMatrix.copy(E.projectionMatrix),De(Y,B,Ie)};function De(Y,Z,fe){fe===null?Y.matrix.copy(Z.matrixWorld):(Y.matrix.copy(fe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Z.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Z.projectionMatrix),Y.projectionMatrixInverse.copy(Z.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Ja*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Y){return f[Y]};let Ke=null;function He(Y,Z){if(d=Z.getViewerPose(c||a),g=Z,d!==null){const fe=d.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Ie=!1;fe.length!==B.cameras.length&&(B.cameras.length=0,Ie=!0);for(let R=0;R<fe.length;R++){const it=fe[R];let Ne=null;if(p!==null)Ne=p.getViewport(it);else{const _e=h.getViewSubImage(u,it);Ne=_e.viewport,R===0&&(e.setRenderTargetTextures(b,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(b))}let Ce=I[R];Ce===void 0&&(Ce=new It,Ce.layers.enable(R),Ce.viewport=new lt,I[R]=Ce),Ce.matrix.fromArray(it.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(it.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),R===0&&(B.matrix.copy(Ce.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ie===!0&&B.cameras.push(Ce)}const Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const R=h.getDepthInformation(fe[0]);R&&R.isValid&&R.texture&&m.init(R,s.renderState)}if(Ee&&Ee.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let R=0;R<fe.length;R++){const it=fe[R].camera;if(it){let Ne=f[it];Ne||(Ne=new Qc,f[it]=Ne);const Ce=h.getCameraImage(it);Ne.sourceTexture=Ce}}}}for(let fe=0;fe<C.length;fe++){const Ie=T[fe],Ee=C[fe];Ie!==null&&Ee!==void 0&&Ee.update(Ie,Z,c||a)}Ke&&Ke(Y,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Fe=new nd;Fe.setAnimationLoop(He),this.setAnimationLoop=function(Y){Ke=Y},this.dispose=function(){}}}const Zn=new an,qg=new ut;function Kg(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,jc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,w,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),d(m,f)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,w):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Lt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Lt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),w=M.envMap,b=M.envMapRotation;w&&(m.envMap.value=w,Zn.copy(b),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),m.envMapRotation.value.setFromMatrix4(qg.makeRotationFromEuler(Zn)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,w){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=w*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Lt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function jg(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,w){const b=w.program;i.uniformBlockBinding(M,b)}function c(M,w){let b=s[M.id];b===void 0&&(g(M),b=d(M),s[M.id]=b,M.addEventListener("dispose",m));const C=w.program;i.updateUBOMapping(M,C);const T=e.render.frame;r[M.id]!==T&&(u(M),r[M.id]=T)}function d(M){const w=h();M.__bindingPointIndex=w;const b=n.createBuffer(),C=M.__size,T=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,C,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,b),b}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const w=s[M.id],b=M.uniforms,C=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let T=0,P=b.length;T<P;T++){const N=Array.isArray(b[T])?b[T]:[b[T]];for(let E=0,S=N.length;E<S;E++){const I=N[E];if(p(I,T,E,C)===!0){const B=I.__offset,H=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let j=0;j<H.length;j++){const X=H[j],ee=v(X);typeof X=="number"||typeof X=="boolean"?(I.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,B+q,I.__data)):X.isMatrix3?(I.__data[0]=X.elements[0],I.__data[1]=X.elements[1],I.__data[2]=X.elements[2],I.__data[3]=0,I.__data[4]=X.elements[3],I.__data[5]=X.elements[4],I.__data[6]=X.elements[5],I.__data[7]=0,I.__data[8]=X.elements[6],I.__data[9]=X.elements[7],I.__data[10]=X.elements[8],I.__data[11]=0):(X.toArray(I.__data,q),q+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(M,w,b,C){const T=M.value,P=w+"_"+b;if(C[P]===void 0)return typeof T=="number"||typeof T=="boolean"?C[P]=T:C[P]=T.clone(),!0;{const N=C[P];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return C[P]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function g(M){const w=M.uniforms;let b=0;const C=16;for(let P=0,N=w.length;P<N;P++){const E=Array.isArray(w[P])?w[P]:[w[P]];for(let S=0,I=E.length;S<I;S++){const B=E[S],H=Array.isArray(B.value)?B.value:[B.value];for(let q=0,j=H.length;q<j;q++){const X=H[q],ee=v(X),z=b%C,se=z%ee.boundary,oe=z+se;b+=se,oe!==0&&C-oe<ee.storage&&(b+=C-oe),B.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=b,b+=ee.storage}}}const T=b%C;return T>0&&(b+=C-T),M.__size=b,M.__cache={},this}function v(M){const w={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(w.boundary=4,w.storage=4):M.isVector2?(w.boundary=8,w.storage=8):M.isVector3||M.isColor?(w.boundary=16,w.storage=12):M.isVector4?(w.boundary=16,w.storage=16):M.isMatrix3?(w.boundary=48,w.storage=48):M.isMatrix4?(w.boundary=64,w.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),w}function m(M){const w=M.target;w.removeEventListener("dispose",m);const b=a.indexOf(w.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function f(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}class Lo{constructor(e={}){const{canvas:t=Ih(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const M=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let C=!1;this._outputColorSpace=St;let T=0,P=0,N=null,E=-1,S=null;const I=new lt,B=new lt;let H=null;const q=new Ue(0);let j=0,X=t.width,ee=t.height,z=1,se=null,oe=null;const me=new lt(0,0,X,ee),De=new lt(0,0,X,ee);let Ke=!1;const He=new To;let Fe=!1,Y=!1;const Z=new ut,fe=new O,Ie=new lt,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function Mt(){return N===null?z:1}let R=i;function it(y,D){return t.getContext(y,D)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${mo}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",J,!1),R===null){const D="webgl2";if(R=it(D,y),R===null)throw it(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ne,Ce,_e,st,Ae,Ve,_t,ct,x,_,U,W,$,G,Se,ie,ve,ye,te,de,Re,be,le,Oe;function L(){Ne=new am(R),Ne.init(),be=new Gg(R,Ne),Ce=new Qp(R,Ne,e,be),_e=new Vg(R,Ne),Ce.reversedDepthBuffer&&u&&_e.buffers.depth.setReversed(!0),st=new cm(R),Ae=new Tg,Ve=new zg(R,Ne,_e,Ae,Ce,be,st),_t=new tm(b),ct=new rm(b),x=new pu(R),le=new Zp(R,x),_=new om(R,x,st,le),U=new hm(R,_,x,st),te=new dm(R,Ce,Ve),ie=new em(Ae),W=new wg(b,_t,ct,Ne,Ce,le,ie),$=new Kg(b,Ae),G=new Cg,Se=new Ng(Ne),ye=new $p(b,_t,ct,_e,U,p,l),ve=new Bg(b,U,Ce),Oe=new jg(R,st,Ce,_e),de=new Jp(R,Ne,st),Re=new lm(R,Ne,st),st.programs=W.programs,b.capabilities=Ce,b.extensions=Ne,b.properties=Ae,b.renderLists=G,b.shadowMap=ve,b.state=_e,b.info=st}L();const ne=new Yg(b,R);this.xr=ne,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const y=Ne.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ne.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(y){y!==void 0&&(z=y,this.setSize(X,ee,!1))},this.getSize=function(y){return y.set(X,ee)},this.setSize=function(y,D,F=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,ee=D,t.width=Math.floor(y*z),t.height=Math.floor(D*z),F===!0&&(t.style.width=y+"px",t.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(X*z,ee*z).floor()},this.setDrawingBufferSize=function(y,D,F){X=y,ee=D,z=F,t.width=Math.floor(y*F),t.height=Math.floor(D*F),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(I)},this.getViewport=function(y){return y.copy(me)},this.setViewport=function(y,D,F,V){y.isVector4?me.set(y.x,y.y,y.z,y.w):me.set(y,D,F,V),_e.viewport(I.copy(me).multiplyScalar(z).round())},this.getScissor=function(y){return y.copy(De)},this.setScissor=function(y,D,F,V){y.isVector4?De.set(y.x,y.y,y.z,y.w):De.set(y,D,F,V),_e.scissor(B.copy(De).multiplyScalar(z).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(y){_e.setScissorTest(Ke=y)},this.setOpaqueSort=function(y){se=y},this.setTransparentSort=function(y){oe=y},this.getClearColor=function(y){return y.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor(...arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha(...arguments)},this.clear=function(y=!0,D=!0,F=!0){let V=0;if(y){let k=!1;if(N!==null){const Q=N.texture.format;k=Q===So||Q===bo||Q===yo}if(k){const Q=N.texture.type,ce=Q===fn||Q===ai||Q===ts||Q===ns||Q===Ao||Q===vo,pe=ye.getClearColor(),he=ye.getClearAlpha(),Te=pe.r,Pe=pe.g,Me=pe.b;ce?(g[0]=Te,g[1]=Pe,g[2]=Me,g[3]=he,R.clearBufferuiv(R.COLOR,0,g)):(v[0]=Te,v[1]=Pe,v[2]=Me,v[3]=he,R.clearBufferiv(R.COLOR,0,v))}else V|=R.COLOR_BUFFER_BIT}D&&(V|=R.DEPTH_BUFFER_BIT),F&&(V|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",J,!1),ye.dispose(),G.dispose(),Se.dispose(),Ae.dispose(),_t.dispose(),ct.dispose(),U.dispose(),le.dispose(),Oe.dispose(),W.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",on),ne.removeEventListener("sessionend",Uo),Hn.stop()};function re(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const y=st.autoReset,D=ve.enabled,F=ve.autoUpdate,V=ve.needsUpdate,k=ve.type;L(),st.autoReset=y,ve.enabled=D,ve.autoUpdate=F,ve.needsUpdate=V,ve.type=k}function J(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function K(y){const D=y.target;D.removeEventListener("dispose",K),ge(D)}function ge(y){ke(y),Ae.remove(y)}function ke(y){const D=Ae.get(y).programs;D!==void 0&&(D.forEach(function(F){W.releaseProgram(F)}),y.isShaderMaterial&&W.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,F,V,k,Q){D===null&&(D=Ee);const ce=k.isMesh&&k.matrixWorld.determinant()<0,pe=Ed(y,D,F,V,k);_e.setMaterial(V,ce);let he=F.index,Te=1;if(V.wireframe===!0){if(he=_.getWireframeAttribute(F),he===void 0)return;Te=2}const Pe=F.drawRange,Me=F.attributes.position;let We=Pe.start*Te,Je=(Pe.start+Pe.count)*Te;Q!==null&&(We=Math.max(We,Q.start*Te),Je=Math.min(Je,(Q.start+Q.count)*Te)),he!==null?(We=Math.max(We,0),Je=Math.min(Je,he.count)):Me!=null&&(We=Math.max(We,0),Je=Math.min(Je,Me.count));const ot=Je-We;if(ot<0||ot===1/0)return;le.setup(k,V,pe,F,he);let nt,et=de;if(he!==null&&(nt=x.get(he),et=Re,et.setIndex(nt)),k.isMesh)V.wireframe===!0?(_e.setLineWidth(V.wireframeLinewidth*Mt()),et.setMode(R.LINES)):et.setMode(R.TRIANGLES);else if(k.isLine){let we=V.linewidth;we===void 0&&(we=1),_e.setLineWidth(we*Mt()),k.isLineSegments?et.setMode(R.LINES):k.isLineLoop?et.setMode(R.LINE_LOOP):et.setMode(R.LINE_STRIP)}else k.isPoints?et.setMode(R.POINTS):k.isSprite&&et.setMode(R.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)rs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))et.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const we=k._multiDrawStarts,rt=k._multiDrawCounts,je=k._multiDrawCount,Vt=he?x.get(he).bytesPerElement:1,li=Ae.get(V).currentProgram.getUniforms();for(let zt=0;zt<je;zt++)li.setValue(R,"_gl_DrawID",zt),et.render(we[zt]/Vt,rt[zt])}else if(k.isInstancedMesh)et.renderInstances(We,ot,k.count);else if(F.isInstancedBufferGeometry){const we=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,rt=Math.min(F.instanceCount,we);et.renderInstances(We,ot,rt)}else et.render(We,ot)};function tt(y,D,F){y.transparent===!0&&y.side===Sn&&y.forceSinglePass===!1?(y.side=Lt,y.needsUpdate=!0,ms(y,D,F),y.side=un,y.needsUpdate=!0,ms(y,D,F),y.side=Sn):ms(y,D,F)}this.compile=function(y,D,F=null){F===null&&(F=y),f=Se.get(F),f.init(D),w.push(f),F.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),y!==F&&y.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),f.setupLights();const V=new Set;return y.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const Q=k.material;if(Q)if(Array.isArray(Q))for(let ce=0;ce<Q.length;ce++){const pe=Q[ce];tt(pe,F,k),V.add(pe)}else tt(Q,F,k),V.add(Q)}),f=w.pop(),V},this.compileAsync=function(y,D,F=null){const V=this.compile(y,D,F);return new Promise(k=>{function Q(){if(V.forEach(function(ce){Ae.get(ce).currentProgram.isReady()&&V.delete(ce)}),V.size===0){k(y);return}setTimeout(Q,10)}Ne.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Ze=null;function pn(y){Ze&&Ze(y)}function on(){Hn.stop()}function Uo(){Hn.start()}const Hn=new nd;Hn.setAnimationLoop(pn),typeof self<"u"&&Hn.setContext(self),this.setAnimationLoop=function(y){Ze=y,ne.setAnimationLoop(y),y===null?Hn.stop():Hn.start()},ne.addEventListener("sessionstart",on),ne.addEventListener("sessionend",Uo),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(D),D=ne.getCamera()),y.isScene===!0&&y.onBeforeRender(b,y,D,N),f=Se.get(y,w.length),f.init(D),w.push(f),Z.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),He.setFromProjectionMatrix(Z,dn,D.reversedDepth),Y=this.localClippingEnabled,Fe=ie.init(this.clippingPlanes,Y),m=G.get(y,M.length),m.init(),M.push(m),ne.enabled===!0&&ne.isPresenting===!0){const Q=b.xr.getDepthSensingMesh();Q!==null&&fr(Q,D,-1/0,b.sortObjects)}fr(y,D,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(se,oe),qe=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,qe&&ye.addToRenderList(m,y),this.info.render.frame++,Fe===!0&&ie.beginShadows();const F=f.state.shadowsArray;ve.render(F,y,D),Fe===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=m.opaque,k=m.transmissive;if(f.setupLights(),D.isArrayCamera){const Q=D.cameras;if(k.length>0)for(let ce=0,pe=Q.length;ce<pe;ce++){const he=Q[ce];Bo(V,k,y,he)}qe&&ye.render(y);for(let ce=0,pe=Q.length;ce<pe;ce++){const he=Q[ce];Oo(m,y,he,he.viewport)}}else k.length>0&&Bo(V,k,y,D),qe&&ye.render(y),Oo(m,y,D);N!==null&&P===0&&(Ve.updateMultisampleRenderTarget(N),Ve.updateRenderTargetMipmap(N)),y.isScene===!0&&y.onAfterRender(b,y,D),le.resetDefaultState(),E=-1,S=null,w.pop(),w.length>0?(f=w[w.length-1],Fe===!0&&ie.setGlobalState(b.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function fr(y,D,F,V){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)F=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||He.intersectsSprite(y)){V&&Ie.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Z);const ce=U.update(y),pe=y.material;pe.visible&&m.push(y,ce,pe,F,Ie.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||He.intersectsObject(y))){const ce=U.update(y),pe=y.material;if(V&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ie.copy(y.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Ie.copy(ce.boundingSphere.center)),Ie.applyMatrix4(y.matrixWorld).applyMatrix4(Z)),Array.isArray(pe)){const he=ce.groups;for(let Te=0,Pe=he.length;Te<Pe;Te++){const Me=he[Te],We=pe[Me.materialIndex];We&&We.visible&&m.push(y,ce,We,F,Ie.z,Me)}}else pe.visible&&m.push(y,ce,pe,F,Ie.z,null)}}const Q=y.children;for(let ce=0,pe=Q.length;ce<pe;ce++)fr(Q[ce],D,F,V)}function Oo(y,D,F,V){const k=y.opaque,Q=y.transmissive,ce=y.transparent;f.setupLightsView(F),Fe===!0&&ie.setGlobalState(b.clippingPlanes,F),V&&_e.viewport(I.copy(V)),k.length>0&&ps(k,D,F),Q.length>0&&ps(Q,D,F),ce.length>0&&ps(ce,D,F),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Bo(y,D,F,V){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[V.id]===void 0&&(f.state.transmissionRenderTarget[V.id]=new oi(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?ds:fn,minFilter:si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const Q=f.state.transmissionRenderTarget[V.id],ce=V.viewport||I;Q.setSize(ce.z*b.transmissionResolutionScale,ce.w*b.transmissionResolutionScale);const pe=b.getRenderTarget(),he=b.getActiveCubeFace(),Te=b.getActiveMipmapLevel();b.setRenderTarget(Q),b.getClearColor(q),j=b.getClearAlpha(),j<1&&b.setClearColor(16777215,.5),b.clear(),qe&&ye.render(F);const Pe=b.toneMapping;b.toneMapping=Bn;const Me=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),f.setupLightsView(V),Fe===!0&&ie.setGlobalState(b.clippingPlanes,V),ps(y,F,V),Ve.updateMultisampleRenderTarget(Q),Ve.updateRenderTargetMipmap(Q),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Je=0,ot=D.length;Je<ot;Je++){const nt=D[Je],et=nt.object,we=nt.geometry,rt=nt.material,je=nt.group;if(rt.side===Sn&&et.layers.test(V.layers)){const Vt=rt.side;rt.side=Lt,rt.needsUpdate=!0,Fo(et,F,V,we,rt,je),rt.side=Vt,rt.needsUpdate=!0,We=!0}}We===!0&&(Ve.updateMultisampleRenderTarget(Q),Ve.updateRenderTargetMipmap(Q))}b.setRenderTarget(pe,he,Te),b.setClearColor(q,j),Me!==void 0&&(V.viewport=Me),b.toneMapping=Pe}function ps(y,D,F){const V=D.isScene===!0?D.overrideMaterial:null;for(let k=0,Q=y.length;k<Q;k++){const ce=y[k],pe=ce.object,he=ce.geometry,Te=ce.group;let Pe=ce.material;Pe.allowOverride===!0&&V!==null&&(Pe=V),pe.layers.test(F.layers)&&Fo(pe,D,F,he,Pe,Te)}}function Fo(y,D,F,V,k,Q){y.onBeforeRender(b,D,F,V,k,Q),y.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),k.onBeforeRender(b,D,F,V,y,Q),k.transparent===!0&&k.side===Sn&&k.forceSinglePass===!1?(k.side=Lt,k.needsUpdate=!0,b.renderBufferDirect(F,D,V,k,y,Q),k.side=un,k.needsUpdate=!0,b.renderBufferDirect(F,D,V,k,y,Q),k.side=Sn):b.renderBufferDirect(F,D,V,k,y,Q),y.onAfterRender(b,D,F,V,k,Q)}function ms(y,D,F){D.isScene!==!0&&(D=Ee);const V=Ae.get(y),k=f.state.lights,Q=f.state.shadowsArray,ce=k.state.version,pe=W.getParameters(y,k.state,Q,D,F),he=W.getProgramCacheKey(pe);let Te=V.programs;V.environment=y.isMeshStandardMaterial?D.environment:null,V.fog=D.fog,V.envMap=(y.isMeshStandardMaterial?ct:_t).get(y.envMap||V.environment),V.envMapRotation=V.environment!==null&&y.envMap===null?D.environmentRotation:y.envMapRotation,Te===void 0&&(y.addEventListener("dispose",K),Te=new Map,V.programs=Te);let Pe=Te.get(he);if(Pe!==void 0){if(V.currentProgram===Pe&&V.lightsStateVersion===ce)return zo(y,pe),Pe}else pe.uniforms=W.getUniforms(y),y.onBeforeCompile(pe,b),Pe=W.acquireProgram(pe,he),Te.set(he,Pe),V.uniforms=pe.uniforms;const Me=V.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Me.clippingPlanes=ie.uniform),zo(y,pe),V.needsLights=xd(y),V.lightsStateVersion=ce,V.needsLights&&(Me.ambientLightColor.value=k.state.ambient,Me.lightProbe.value=k.state.probe,Me.directionalLights.value=k.state.directional,Me.directionalLightShadows.value=k.state.directionalShadow,Me.spotLights.value=k.state.spot,Me.spotLightShadows.value=k.state.spotShadow,Me.rectAreaLights.value=k.state.rectArea,Me.ltc_1.value=k.state.rectAreaLTC1,Me.ltc_2.value=k.state.rectAreaLTC2,Me.pointLights.value=k.state.point,Me.pointLightShadows.value=k.state.pointShadow,Me.hemisphereLights.value=k.state.hemi,Me.directionalShadowMap.value=k.state.directionalShadowMap,Me.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Me.spotShadowMap.value=k.state.spotShadowMap,Me.spotLightMatrix.value=k.state.spotLightMatrix,Me.spotLightMap.value=k.state.spotLightMap,Me.pointShadowMap.value=k.state.pointShadowMap,Me.pointShadowMatrix.value=k.state.pointShadowMatrix),V.currentProgram=Pe,V.uniformsList=null,Pe}function Vo(y){if(y.uniformsList===null){const D=y.currentProgram.getUniforms();y.uniformsList=Ks.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function zo(y,D){const F=Ae.get(y);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.batchingColor=D.batchingColor,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function Ed(y,D,F,V,k){D.isScene!==!0&&(D=Ee),Ve.resetTextureUnits();const Q=D.fog,ce=V.isMeshStandardMaterial?D.environment:null,pe=N===null?b.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ui,he=(V.isMeshStandardMaterial?ct:_t).get(V.envMap||ce),Te=V.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pe=!!F.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Me=!!F.morphAttributes.position,We=!!F.morphAttributes.normal,Je=!!F.morphAttributes.color;let ot=Bn;V.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ot=b.toneMapping);const nt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,et=nt!==void 0?nt.length:0,we=Ae.get(V),rt=f.state.lights;if(Fe===!0&&(Y===!0||y!==S)){const Tt=y===S&&V.id===E;ie.setState(V,y,Tt)}let je=!1;V.version===we.__version?(we.needsLights&&we.lightsStateVersion!==rt.state.version||we.outputColorSpace!==pe||k.isBatchedMesh&&we.batching===!1||!k.isBatchedMesh&&we.batching===!0||k.isBatchedMesh&&we.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&we.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&we.instancing===!1||!k.isInstancedMesh&&we.instancing===!0||k.isSkinnedMesh&&we.skinning===!1||!k.isSkinnedMesh&&we.skinning===!0||k.isInstancedMesh&&we.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&we.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&we.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&we.instancingMorph===!1&&k.morphTexture!==null||we.envMap!==he||V.fog===!0&&we.fog!==Q||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ie.numPlanes||we.numIntersection!==ie.numIntersection)||we.vertexAlphas!==Te||we.vertexTangents!==Pe||we.morphTargets!==Me||we.morphNormals!==We||we.morphColors!==Je||we.toneMapping!==ot||we.morphTargetsCount!==et)&&(je=!0):(je=!0,we.__version=V.version);let Vt=we.currentProgram;je===!0&&(Vt=ms(V,D,k));let li=!1,zt=!1,Wi=!1;const at=Vt.getUniforms(),qt=we.uniforms;if(_e.useProgram(Vt.program)&&(li=!0,zt=!0,Wi=!0),V.id!==E&&(E=V.id,zt=!0),li||S!==y){_e.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),at.setValue(R,"projectionMatrix",y.projectionMatrix),at.setValue(R,"viewMatrix",y.matrixWorldInverse);const Nt=at.map.cameraPosition;Nt!==void 0&&Nt.setValue(R,fe.setFromMatrixPosition(y.matrixWorld)),Ce.logarithmicDepthBuffer&&at.setValue(R,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&at.setValue(R,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,zt=!0,Wi=!0)}if(k.isSkinnedMesh){at.setOptional(R,k,"bindMatrix"),at.setOptional(R,k,"bindMatrixInverse");const Tt=k.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),at.setValue(R,"boneTexture",Tt.boneTexture,Ve))}k.isBatchedMesh&&(at.setOptional(R,k,"batchingTexture"),at.setValue(R,"batchingTexture",k._matricesTexture,Ve),at.setOptional(R,k,"batchingIdTexture"),at.setValue(R,"batchingIdTexture",k._indirectTexture,Ve),at.setOptional(R,k,"batchingColorTexture"),k._colorsTexture!==null&&at.setValue(R,"batchingColorTexture",k._colorsTexture,Ve));const Kt=F.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&te.update(k,F,Vt),(zt||we.receiveShadow!==k.receiveShadow)&&(we.receiveShadow=k.receiveShadow,at.setValue(R,"receiveShadow",k.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(qt.envMap.value=he,qt.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&D.environment!==null&&(qt.envMapIntensity.value=D.environmentIntensity),zt&&(at.setValue(R,"toneMappingExposure",b.toneMappingExposure),we.needsLights&&Md(qt,Wi),Q&&V.fog===!0&&$.refreshFogUniforms(qt,Q),$.refreshMaterialUniforms(qt,V,z,ee,f.state.transmissionRenderTarget[y.id]),Ks.upload(R,Vo(we),qt,Ve)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ks.upload(R,Vo(we),qt,Ve),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&at.setValue(R,"center",k.center),at.setValue(R,"modelViewMatrix",k.modelViewMatrix),at.setValue(R,"normalMatrix",k.normalMatrix),at.setValue(R,"modelMatrix",k.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Tt=V.uniformsGroups;for(let Nt=0,pr=Tt.length;Nt<pr;Nt++){const Wn=Tt[Nt];Oe.update(Wn,Vt),Oe.bind(Wn,Vt)}}return Vt}function Md(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function xd(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(y,D,F){const V=Ae.get(y);V.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),Ae.get(y.texture).__webglTexture=D,Ae.get(y.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:F,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,D){const F=Ae.get(y);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0};const wd=R.createFramebuffer();this.setRenderTarget=function(y,D=0,F=0){N=y,T=D,P=F;let V=!0,k=null,Q=!1,ce=!1;if(y){const he=Ae.get(y);if(he.__useDefaultFramebuffer!==void 0)_e.bindFramebuffer(R.FRAMEBUFFER,null),V=!1;else if(he.__webglFramebuffer===void 0)Ve.setupRenderTarget(y);else if(he.__hasExternalTextures)Ve.rebindTextures(y,Ae.get(y.texture).__webglTexture,Ae.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Me=y.depthTexture;if(he.__boundDepthTexture!==Me){if(Me!==null&&Ae.has(Me)&&(y.width!==Me.image.width||y.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(y)}}const Te=y.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ce=!0);const Pe=Ae.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[D])?k=Pe[D][F]:k=Pe[D],Q=!0):y.samples>0&&Ve.useMultisampledRTT(y)===!1?k=Ae.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?k=Pe[F]:k=Pe,I.copy(y.viewport),B.copy(y.scissor),H=y.scissorTest}else I.copy(me).multiplyScalar(z).floor(),B.copy(De).multiplyScalar(z).floor(),H=Ke;if(F!==0&&(k=wd),_e.bindFramebuffer(R.FRAMEBUFFER,k)&&V&&_e.drawBuffers(y,k),_e.viewport(I),_e.scissor(B),_e.setScissorTest(H),Q){const he=Ae.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+D,he.__webglTexture,F)}else if(ce){const he=D;for(let Te=0;Te<y.textures.length;Te++){const Pe=Ae.get(y.textures[Te]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Te,Pe.__webglTexture,F,he)}}else if(y!==null&&F!==0){const he=Ae.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,he.__webglTexture,F)}E=-1},this.readRenderTargetPixels=function(y,D,F,V,k,Q,ce,pe=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=Ae.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he){_e.bindFramebuffer(R.FRAMEBUFFER,he);try{const Te=y.textures[pe],Pe=Te.format,Me=Te.type;if(!Ce.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ce.textureTypeReadable(Me)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-V&&F>=0&&F<=y.height-k&&(y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pe),R.readPixels(D,F,V,k,be.convert(Pe),be.convert(Me),Q))}finally{const Te=N!==null?Ae.get(N).__webglFramebuffer:null;_e.bindFramebuffer(R.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(y,D,F,V,k,Q,ce,pe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=Ae.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he)if(D>=0&&D<=y.width-V&&F>=0&&F<=y.height-k){_e.bindFramebuffer(R.FRAMEBUFFER,he);const Te=y.textures[pe],Pe=Te.format,Me=Te.type;if(!Ce.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ce.textureTypeReadable(Me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,We),R.bufferData(R.PIXEL_PACK_BUFFER,Q.byteLength,R.STREAM_READ),y.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+pe),R.readPixels(D,F,V,k,be.convert(Pe),be.convert(Me),0);const Je=N!==null?Ae.get(N).__webglFramebuffer:null;_e.bindFramebuffer(R.FRAMEBUFFER,Je);const ot=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Lh(R,ot,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,We),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,Q),R.deleteBuffer(We),R.deleteSync(ot),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,D=null,F=0){const V=Math.pow(2,-F),k=Math.floor(y.image.width*V),Q=Math.floor(y.image.height*V),ce=D!==null?D.x:0,pe=D!==null?D.y:0;Ve.setTexture2D(y,0),R.copyTexSubImage2D(R.TEXTURE_2D,F,0,0,ce,pe,k,Q),_e.unbindTexture()};const Td=R.createFramebuffer(),Rd=R.createFramebuffer();this.copyTextureToTexture=function(y,D,F=null,V=null,k=0,Q=null){Q===null&&(k!==0?(rs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=k,k=0):Q=0);let ce,pe,he,Te,Pe,Me,We,Je,ot;const nt=y.isCompressedTexture?y.mipmaps[Q]:y.image;if(F!==null)ce=F.max.x-F.min.x,pe=F.max.y-F.min.y,he=F.isBox3?F.max.z-F.min.z:1,Te=F.min.x,Pe=F.min.y,Me=F.isBox3?F.min.z:0;else{const Kt=Math.pow(2,-k);ce=Math.floor(nt.width*Kt),pe=Math.floor(nt.height*Kt),y.isDataArrayTexture?he=nt.depth:y.isData3DTexture?he=Math.floor(nt.depth*Kt):he=1,Te=0,Pe=0,Me=0}V!==null?(We=V.x,Je=V.y,ot=V.z):(We=0,Je=0,ot=0);const et=be.convert(D.format),we=be.convert(D.type);let rt;D.isData3DTexture?(Ve.setTexture3D(D,0),rt=R.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Ve.setTexture2DArray(D,0),rt=R.TEXTURE_2D_ARRAY):(Ve.setTexture2D(D,0),rt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,D.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,D.unpackAlignment);const je=R.getParameter(R.UNPACK_ROW_LENGTH),Vt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),li=R.getParameter(R.UNPACK_SKIP_PIXELS),zt=R.getParameter(R.UNPACK_SKIP_ROWS),Wi=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,nt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,nt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Te),R.pixelStorei(R.UNPACK_SKIP_ROWS,Pe),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Me);const at=y.isDataArrayTexture||y.isData3DTexture,qt=D.isDataArrayTexture||D.isData3DTexture;if(y.isDepthTexture){const Kt=Ae.get(y),Tt=Ae.get(D),Nt=Ae.get(Kt.__renderTarget),pr=Ae.get(Tt.__renderTarget);_e.bindFramebuffer(R.READ_FRAMEBUFFER,Nt.__webglFramebuffer),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,pr.__webglFramebuffer);for(let Wn=0;Wn<he;Wn++)at&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ae.get(y).__webglTexture,k,Me+Wn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ae.get(D).__webglTexture,Q,ot+Wn)),R.blitFramebuffer(Te,Pe,ce,pe,We,Je,ce,pe,R.DEPTH_BUFFER_BIT,R.NEAREST);_e.bindFramebuffer(R.READ_FRAMEBUFFER,null),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(k!==0||y.isRenderTargetTexture||Ae.has(y)){const Kt=Ae.get(y),Tt=Ae.get(D);_e.bindFramebuffer(R.READ_FRAMEBUFFER,Td),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,Rd);for(let Nt=0;Nt<he;Nt++)at?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Kt.__webglTexture,k,Me+Nt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Kt.__webglTexture,k),qt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Tt.__webglTexture,Q,ot+Nt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Tt.__webglTexture,Q),k!==0?R.blitFramebuffer(Te,Pe,ce,pe,We,Je,ce,pe,R.COLOR_BUFFER_BIT,R.NEAREST):qt?R.copyTexSubImage3D(rt,Q,We,Je,ot+Nt,Te,Pe,ce,pe):R.copyTexSubImage2D(rt,Q,We,Je,Te,Pe,ce,pe);_e.bindFramebuffer(R.READ_FRAMEBUFFER,null),_e.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else qt?y.isDataTexture||y.isData3DTexture?R.texSubImage3D(rt,Q,We,Je,ot,ce,pe,he,et,we,nt.data):D.isCompressedArrayTexture?R.compressedTexSubImage3D(rt,Q,We,Je,ot,ce,pe,he,et,nt.data):R.texSubImage3D(rt,Q,We,Je,ot,ce,pe,he,et,we,nt):y.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,Q,We,Je,ce,pe,et,we,nt.data):y.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,Q,We,Je,nt.width,nt.height,et,nt.data):R.texSubImage2D(R.TEXTURE_2D,Q,We,Je,ce,pe,et,we,nt);R.pixelStorei(R.UNPACK_ROW_LENGTH,je),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Vt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,li),R.pixelStorei(R.UNPACK_SKIP_ROWS,zt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Wi),Q===0&&D.generateMipmaps&&R.generateMipmap(rt),_e.unbindTexture()},this.initRenderTarget=function(y){Ae.get(y).__webglFramebuffer===void 0&&Ve.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Ve.setTextureCube(y,0):y.isData3DTexture?Ve.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Ve.setTexture2DArray(y,0):Ve.setTexture2D(y,0),_e.unbindTexture()},this.resetState=function(){T=0,P=0,N=null,_e.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const ln=(n,e,t)=>Math.min(t,Math.max(e,n)),jr=(n,e,t)=>n+(e-n)*t,$g=(n,e,t)=>(t-n)/(e-n),Hl=(n,e,t)=>{const i=ln($g(n,e,t),0,1);return i*i*(3-2*i)},Wl=(n,e)=>Math.floor(n/e),Xl=(n,e)=>{const t=n%e;return t<0?t+e:t},Zg=(n,e,t,i)=>{const s=n-t,r=e-i;return s*s+r*r},Jg={air:{id:0,key:"air",label:"Air",solid:!1,mineable:!1,placeable:!1,mineDurationMs:0,uiColor:"transparent"},grass:{id:1,key:"grass",label:"Herbe",solid:!0,mineable:!0,placeable:!0,mineDurationMs:600,textureTop:"grass_top",textureSide:"grass_side",textureBottom:"dirt",uiColor:"#6eb75e"},dirt:{id:2,key:"dirt",label:"Terre",solid:!0,mineable:!0,placeable:!0,mineDurationMs:550,textureTop:"dirt",textureSide:"dirt",textureBottom:"dirt",uiColor:"#8d5a34"},stone:{id:3,key:"stone",label:"Pierre",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1700,textureTop:"stone",textureSide:"stone",textureBottom:"stone",uiColor:"#87898e"},wood:{id:4,key:"wood",label:"Buche",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1250,textureTop:"wood_top",textureSide:"wood_side",textureBottom:"wood_top",uiColor:"#8c6239"},leaves:{id:5,key:"leaves",label:"Feuilles",solid:!0,mineable:!0,placeable:!0,mineDurationMs:500,textureTop:"leaves",textureSide:"leaves",textureBottom:"leaves",uiColor:"#4d8748"},bedrock:{id:6,key:"bedrock",label:"Bedrock",solid:!0,mineable:!1,placeable:!1,mineDurationMs:0,textureTop:"bedrock",textureSide:"bedrock",textureBottom:"bedrock",uiColor:"#393a3c"},planks:{id:7,key:"planks",label:"Planches",solid:!0,mineable:!0,placeable:!0,mineDurationMs:700,textureTop:"planks",textureSide:"planks",textureBottom:"planks",uiColor:"#c08b51"},crafting_table:{id:8,key:"crafting_table",label:"Table de craft",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1200,textureTop:"crafting_table_top",textureSide:"crafting_table_side",textureBottom:"planks",uiColor:"#8b623c"},stone_bricks:{id:9,key:"stone_bricks",label:"Briques de pierre",solid:!0,mineable:!0,placeable:!0,mineDurationMs:1900,textureTop:"stone_bricks",textureSide:"stone_bricks",textureBottom:"stone_bricks",uiColor:"#8a8d95"},water:{id:10,key:"water",label:"Eau",solid:!1,mineable:!1,placeable:!1,mineDurationMs:0,textureTop:"water",textureSide:"water",textureBottom:"water",transparent:!0,liquid:!0,uiColor:"#4f89d6"},sand:{id:11,key:"sand",label:"Sable",solid:!0,mineable:!0,placeable:!0,mineDurationMs:650,textureTop:"sand",textureSide:"sand",textureBottom:"sand",uiColor:"#d8c07f"},clay:{id:12,key:"clay",label:"Argile",solid:!0,mineable:!0,placeable:!0,mineDurationMs:900,textureTop:"clay",textureSide:"clay",textureBottom:"clay",uiColor:"#8ea2b7"},mud:{id:13,key:"mud",label:"Boue",solid:!0,mineable:!0,placeable:!0,mineDurationMs:820,textureTop:"mud",textureSide:"mud",textureBottom:"mud",uiColor:"#4f463c"},grass_plant:{id:14,key:"grass_plant",label:"Hautes herbes",solid:!1,mineable:!0,placeable:!0,mineDurationMs:280,textureTop:"grass_plant",textureSide:"grass_plant",textureBottom:"grass_plant",transparent:!0,plant:!0,uiColor:"#6cab58"},flower_red:{id:15,key:"flower_red",label:"Fleur rouge",solid:!1,mineable:!0,placeable:!0,mineDurationMs:260,textureTop:"flower_red",textureSide:"flower_red",textureBottom:"flower_red",transparent:!0,plant:!0,uiColor:"#d3504f"}},od=new Map(Object.values(Jg).map(n=>[n.id,n])),Gn=n=>{const e=od.get(n);if(!e)throw new Error(`Unknown block id ${n}`);return e},Os=(n,e=wc())=>{const t=Gn(n).key;return Ft(`blocks.${t}`,{},e)},Ii=n=>n===null?"transparent":od.get(n)?.uiColor??"#000",Qg=n=>Gn(n).mineDurationMs,Fn=n=>Gn(n).solid,$r=n=>Gn(n).mineable,e_=n=>Gn(n).placeable,ir=n=>Gn(n).liquid===!0,Yl=n=>Gn(n).plant===!0,bt=Le.colliderWidth/2,os=Le.colliderHeight,t_=(n,e)=>{const t=Math.floor(e[0]-bt),i=Math.floor(e[0]+bt),s=Math.floor(e[1]),r=Math.floor(e[1]+os-.001),a=Math.floor(e[2]-bt),o=Math.floor(e[2]+bt);for(let l=t;l<=i;l+=1)for(let c=s;c<=r;c+=1)for(let d=a;d<=o;d+=1)if(Fn(n.getBlock(l,c,d)))return!0;return!1},ql=(n,e,t=.06)=>{const i=Math.floor(e[1]-t),s=Math.max(.02,bt-.03),r=[[0,0],[-s,-s],[s,-s],[-s,s],[s,s]];for(const[a,o]of r){const l=Math.floor(e[0]+a),c=Math.floor(e[2]+o);if(Fn(n.getBlock(l,i,c)))return!0}return!1},Zr=(n,e,t,i)=>{let s=!1,r=0;for(;t_(n,e)&&r<8;){if(s=!0,i===0)if(t[0]>0){const a=Math.floor(e[0]+bt);e[0]=a-bt-.001}else if(t[0]<0){const a=Math.floor(e[0]-bt);e[0]=a+1+bt+.001}else break;else if(i===1)if(t[1]>0){const a=Math.floor(e[1]+os);e[1]=a-os-.001}else if(t[1]<0){const a=Math.floor(e[1]);e[1]=a+1}else break;else if(t[2]>0){const a=Math.floor(e[2]+bt);e[2]=a-bt-.001}else if(t[2]<0){const a=Math.floor(e[2]-bt);e[2]=a+1+bt+.001}else break;r+=1}return s};class kn{static simulate(e,t,i,s){const r=[...t],a=[...i];let o=!1;return r[0]+=a[0]*s,Zr(e,r,a,0)&&(a[0]=0),r[2]+=a[2]*s,Zr(e,r,a,2)&&(a[2]=0),r[1]+=a[1]*s,Zr(e,r,a,1)?(o=a[1]<=0,a[1]=0):o=ql(e,r),{position:r,velocity:a,grounded:o}}static wouldCollideWithBlock(e,t,i,s){const r=e[0]-bt,a=e[0]+bt,o=e[1],l=e[1]+os,c=e[2]-bt,d=e[2]+bt;return!(a<=t||r>=t+1||l<=i||o>=i+1||d<=s||c>=s+1)}static sampleWater(e,t){const i=Math.floor(t[0]),s=Math.floor(t[2]),r=Math.floor(t[1]);let a=0;for(let o=0;o<=Math.ceil(os);o+=1)ir(e.getBlock(i,r+o,s))&&(a+=1);return{inWater:a>0,depthBlocks:a}}static hasGroundSupport(e,t){return ql(e,t)}}class Kl{state;grounded=!1;crouched=!1;sprinting=!1;sprintToggle=!1;inWater=!1;jumpCooldownMs=0;groundedDurationMs=0;coyoteTimeMs=0;jumpBufferMs=0;sprintCarryInAir=!1;allowHeldJump=!1;waterSurfaceRiseLockMs=0;moveVector=new O;upAxis=new O(0,1,0);lookEuler=new an(0,0,0,"YXZ");constructor(e){this.state=e}update(e,t,i,s){const r=e*1e3,a=e/Le.mcTickSeconds;this.jumpCooldownMs=Math.max(0,this.jumpCooldownMs-r),this.coyoteTimeMs=Math.max(0,this.coyoteTimeMs-r),this.jumpBufferMs=Math.max(0,this.jumpBufferMs-r),this.waterSurfaceRiseLockMs=Math.max(0,this.waterSurfaceRiseLockMs-r),this.grounded?(this.groundedDurationMs+=r,this.coyoteTimeMs=Le.coyoteTimeMs):this.groundedDurationMs=0;const o=t.consumeLookDelta();this.state.yaw-=o.x*Le.mouseSensitivity,this.state.pitch=ln(this.state.pitch-o.y*Le.mouseSensitivity,-Math.PI/2+.01,Math.PI/2-.01);const l=Number(t.isAnyKeyDown([s.moveLeft.primary,s.moveLeft.secondary])),c=Number(t.isAnyKeyDown([s.moveRight.primary,s.moveRight.secondary])),d=Number(t.isAnyKeyDown([s.moveForward.primary,s.moveForward.secondary])),h=Number(t.isAnyKeyDown([s.moveBackward.primary,s.moveBackward.secondary])),u=c-l,p=d-h;this.crouched=t.isAnyKeyDown([s.crouch.primary,s.crouch.secondary]);const g=t.isAnyKeyDown([s.sprint.primary,s.sprint.secondary]),v=t.consumeAnyJustPressed([s.sprint.primary,s.sprint.secondary]),m=t.isAnyKeyDown([s.jump.primary,s.jump.secondary]),f=t.consumeAnyJustPressed([s.jump.primary,s.jump.secondary]);f&&(this.jumpBufferMs=Le.jumpBufferMs),m||(this.allowHeldJump=!1);const M=this.inWater,w=kn.sampleWater(i,this.state.position);this.inWater=w.inWater,this.inWater||(this.waterSurfaceRiseLockMs=0);const b=new O(u,0,-p);b.lengthSq()>1&&b.normalize();const C=b.lengthSq()>0;C?this.moveVector.copy(b).applyAxisAngle(this.upAxis,this.state.yaw):this.moveVector.set(0,0,0);const T=this.grounded&&this.state.velocity[1]<=.04,P=p>0,N=T&&P&&!m&&C?this.hasSprintObstacle(i,this.moveVector):!1;v&&P&&!this.crouched&&!N&&(this.sprintToggle=!0),this.sprintToggle&&(!C||h>0||this.crouched)&&(this.sprintToggle=!1);const S=(g||this.sprintToggle)&&P&&!this.crouched&&!N;if(this.inWater?(this.sprinting=!1,this.sprintToggle=!1,this.sprintCarryInAir=!1):T?(this.sprinting=S,this.sprintCarryInAir=S):(S&&(this.sprintCarryInAir=!0),(h>0||this.crouched)&&(this.sprintCarryInAir=!1),this.sprinting=this.sprintCarryInAir),C&&(this.sprinting&&P&&Math.abs(u)>0&&(b.x*=T?Le.groundSprintForwardStrafeScale:Le.airSprintForwardStrafeScale,b.normalize()),this.moveVector.copy(b).applyAxisAngle(this.upAxis,this.state.yaw)),this.inWater){const z=this.crouched?Le.crouchSpeed:this.sprinting?Le.sprintSpeed:Le.walkSpeed,se=!this.grounded&&this.sprinting&&Math.abs(b.x)>0?Le.walkSpeed:z,oe=new O(b.x*se*.62,0,b.z*z*.62);oe.applyAxisAngle(this.upAxis,this.state.yaw),this.state.velocity[0]=oe.x,this.state.velocity[2]=oe.z;const me=w.depthBlocks>=2?5.2:2.1,De=!M&&this.inWater,Ke=w.depthBlocks<=1;if(De&&m&&Ke&&this.state.velocity[1]<=0&&(this.waterSurfaceRiseLockMs=140),m&&Ke&&this.waterSurfaceRiseLockMs>0){const Fe=this.crouched?-2.15:-.95;this.state.velocity[1]=Math.min(this.state.velocity[1],Fe)}else if(m)this.state.velocity[1]=Math.min(4.1,this.state.velocity[1]+12*e);else{const Fe=this.crouched?2.4:0;this.state.velocity[1]=Math.max(this.state.velocity[1]-(me+Fe)*e,-4.5)}(w.depthBlocks>=2||!m)&&(this.waterSurfaceRiseLockMs=0),this.state.velocity[1]*=.96}else{const z=T?Le.groundFrictionTick:Le.airFrictionTick,se=Math.pow(z,a);this.state.velocity[0]*=se,this.state.velocity[2]*=se;const oe=Math.hypot(this.state.velocity[0],this.state.velocity[2]);if(C){let He=T?this.crouched?Le.groundCrouchAccelerationTick:this.sprinting?Le.groundSprintAccelerationTick:Le.groundWalkAccelerationTick:this.sprinting?Le.airSprintAccelerationTick:Le.airWalkAccelerationTick;!T&&Math.abs(u)>0&&(this.sprinting?He*=p>0?Le.airSprintSideControlPenalty:Le.airStrafePenalty:P||(He*=Le.airStrafePenalty));const Fe=He*(1/Le.mcTickSeconds);this.state.velocity[0]+=this.moveVector.x*Fe*a,this.state.velocity[2]+=this.moveVector.z*Fe*a}if(!T&&this.state.velocity[1]<0&&Math.abs(u)>0&&p<=0){const He=Math.hypot(this.state.velocity[0],this.state.velocity[2]),Fe=Math.max(oe,Le.fallStrafeBaseControlSpeed);if(He>Fe&&He>1e-4){const Y=Fe/He;this.state.velocity[0]*=Y,this.state.velocity[2]*=Y}}const me=T?this.crouched?Le.crouchSpeed:this.sprinting?Le.sprintSpeed:Le.walkSpeed:this.sprinting?Le.airborneSprintSpeed:Le.airborneWalkSpeed,De=Math.min(Le.maxHorizontalSpeed,me),Ke=Math.hypot(this.state.velocity[0],this.state.velocity[2]);if(Ke>De&&Ke>1e-4){const He=De/Ke;this.state.velocity[0]*=He,this.state.velocity[2]*=He}this.crouched&&T&&!m&&this.applyCrouchEdgeClamp(i,e),this.state.velocity[1]-=Le.gravity*e,this.state.velocity[1]*=Math.pow(Le.verticalDragTick,a),this.state.velocity[1]=Math.max(this.state.velocity[1],-22)}if(!this.inWater&&this.state.velocity[1]<-4.2){const[z,se,oe]=this.state.position,me=Math.min(e,Le.landingProbeSeconds),De=[z,se+this.state.velocity[1]*me,oe];kn.hasGroundSupport(i,De)&&(this.state.velocity[1]*=Le.landingApproachDamping)}let I=!1;const B=m&&!f&&this.allowHeldJump&&this.groundedDurationMs>=Le.autoJumpGroundedDelayMs,H=this.jumpBufferMs>0||B,q=T||this.coyoteTimeMs>0;if(!this.inWater&&q&&H&&this.jumpCooldownMs<=0&&(this.state.velocity[1]=Le.jumpVelocity,this.grounded=!1,I=!0,this.groundedDurationMs=0,this.coyoteTimeMs=0,this.jumpBufferMs=0,this.jumpCooldownMs=Le.jumpRepeatDelayMs,this.allowHeldJump=!1,this.sprinting&&P)){const z=new O(0,0,-1).applyAxisAngle(this.upAxis,this.state.yaw);this.state.velocity[0]+=z.x*Le.sprintJumpBoost,this.state.velocity[2]+=z.z*Le.sprintJumpBoost}const j=this.grounded,X=this.state.velocity[1],ee=kn.simulate(i,this.state.position,this.state.velocity,e);return this.state.position=ee.position,this.state.velocity=ee.velocity,this.grounded=ee.grounded,!j&&this.grounded&&(this.groundedDurationMs=0,this.allowHeldJump=X<-.2,this.coyoteTimeMs=Le.coyoteTimeMs,this.jumpCooldownMs=Math.max(this.jumpCooldownMs,Le.landingJumpCooldownMs)),this.grounded||(this.groundedDurationMs=0,this.coyoteTimeMs<=0&&(this.allowHeldJump=!1),(h>0||this.crouched)&&(this.sprintCarryInAir=!1)),this.state.position[1]<-16&&this.respawn(),{jumped:I,sprinting:this.sprinting,moving:C}}respawn(){this.state.position=[...this.state.spawnPoint],this.state.velocity=[0,0,0],this.sprintCarryInAir=!1,this.waterSurfaceRiseLockMs=0}setSelectedSlot(e){this.state.selectedSlot=e}getState(){return{...this.state,position:[...this.state.position],velocity:[...this.state.velocity],spawnPoint:[...this.state.spawnPoint]}}getPosition(){return[...this.state.position]}getCameraPosition(){return{x:this.state.position[0],y:this.state.position[1]+(this.crouched?Le.crouchEyeHeight:Le.eyeHeight),z:this.state.position[2]}}getRotation(){return{yaw:this.state.yaw,pitch:this.state.pitch}}getLookDirection(){const e=new O(0,0,-1);return this.lookEuler.set(this.state.pitch,this.state.yaw,0,"YXZ"),e.applyEuler(this.lookEuler),{x:e.x,y:e.y,z:e.z}}canOccupyBlock(e,t,i){return!kn.wouldCollideWithBlock(this.state.position,e,t,i)}isCrouched(){return this.crouched}isGrounded(){return this.grounded}isInWater(){return this.inWater}applyCrouchEdgeClamp(e,t){const[i,s,r]=this.state.position;if(!kn.hasGroundSupport(e,[i,s,r]))return;const a=i+this.state.velocity[0]*t,o=r+this.state.velocity[2]*t;if(kn.hasGroundSupport(e,[a,s,o]))return;const l=kn.hasGroundSupport(e,[a,s,r]),c=kn.hasGroundSupport(e,[i,s,o]);l||(this.state.velocity[0]=0),c||(this.state.velocity[2]=0)}hasSprintObstacle(e,t){const[i,s,r]=this.state.position,a=t.clone().normalize(),o=new O(-a.z,0,a.x),l=.45,c=i+a.x*l,d=r+a.z*l,h=Math.floor(s+.08),u=Math.floor(s+(this.crouched?1.05:1.4)),p=Math.floor(s+(this.crouched?1.45:1.72));for(const g of[-.16,0,.16]){const v=Math.floor(c+o.x*g),m=Math.floor(d+o.z*g);if(Fn(e.getBlock(v,h,m))||Fn(e.getBlock(v,u,m))||Fn(e.getBlock(v,p,m)))return!0}return!1}}class jl{static resolve(e){for(let t=0;t<=8;t+=1)for(let i=-t;i<=t;i+=1)for(let s=-t;s<=t;s+=1){const a=e.getTopSolidBlockY(i,s)+1;if(e.getBlock(i,a,s)===0&&e.getBlock(i,a+1,s)===0)return[i+.5,a,s+.5]}return[.5,48,.5]}}const Ct=({x:n,z:e})=>`${n},${e}`,n_=n=>{const[e,t]=n.split(",").map(i=>Number.parseInt(i,10));return{x:e,z:t}},Jr=(n,e)=>({x:Wl(n,Ge.chunkSizeX),z:Wl(e,Ge.chunkSizeZ)}),$l=(n,e,t)=>({x:Xl(n,Ge.chunkSizeX),y:e,z:Xl(t,Ge.chunkSizeZ)}),Bi=n=>n.x*Ge.chunkSizeX,Fi=n=>n.z*Ge.chunkSizeZ,i_=[{normal:[1,0,0],corners:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],texture:"side"},{normal:[-1,0,0],corners:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],texture:"side"},{normal:[0,1,0],corners:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],texture:"top"},{normal:[0,-1,0],corners:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],texture:"bottom"},{normal:[0,0,1],corners:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],texture:"side"},{normal:[0,0,-1],corners:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],texture:"side"}];class Ti{static buildGeometry(e,t,i){const s=[],r=[],a=[],o=Bi(e.coord),l=Fi(e.coord);for(let d=0;d<96;d+=1)for(let h=0;h<16;h+=1)for(let u=0;u<16;u+=1){const p=e.getBlock(u,d,h);if(p!==0){if(Yl(p)){const g=Ti.getFaceTextureRect(p,"side",i);Ti.pushPlantCross(s,r,a,u,d,h,g);continue}for(const g of i_){const v=t.getBlock(o+u+g.normal[0],d+g.normal[1],l+h+g.normal[2]);if(ir(p)&&ir(v)||Fn(v)&&!Yl(v))continue;const m=Ti.getFaceTextureRect(p,g.texture,i),f=[[m.u0,m.v1],[m.u0,m.v0],[m.u1,m.v0],[m.u1,m.v1]],M=[0,1,2,0,2,3];for(const w of M){const[b,C,T]=g.corners[w];s.push(u+b,d+C,h+T),r.push(...g.normal),a.push(...f[w])}}}}const c=new Tn;return c.setAttribute("position",new Xt(s,3)),c.setAttribute("normal",new Xt(r,3)),c.setAttribute("uv",new Xt(a,2)),c.computeBoundingSphere(),c}static pushPlantCross(e,t,i,s,r,a,o){[[[s+.14,r,a+.14],[s+.86,r,a+.86],[s+.86,r+.92,a+.86],[s+.14,r+.92,a+.14],[.7,0,.7]],[[s+.86,r,a+.14],[s+.14,r,a+.86],[s+.14,r+.92,a+.86],[s+.86,r+.92,a+.14],[-.7,0,.7]]].forEach(([u,p,g,v,m])=>{Ti.pushQuadDoubleSided(e,t,i,u,p,g,v,m,o)})}static pushQuadDoubleSided(e,t,i,s,r,a,o,l,c){const d=[[c.u0,c.v1],[c.u1,c.v1],[c.u1,c.v0],[c.u0,c.v0]],h=[0,1,2,0,2,3],u=[0,2,1,0,3,2],p=[s,r,a,o];h.forEach(g=>{const v=p[g];e.push(v[0],v[1],v[2]),t.push(l[0],l[1],l[2]),i.push(...d[g])}),u.forEach(g=>{const v=p[g];e.push(v[0],v[1],v[2]),t.push(-l[0],-l[1],-l[2]),i.push(...d[g])})}static getFaceTextureRect(e,t,i){const s=Gn(e);return t==="top"?i.getTileRect(s.textureTop??s.textureSide??"dirt"):t==="bottom"?i.getTileRect(s.textureBottom??s.textureSide??s.textureTop??"dirt"):i.getTileRect(s.textureSide??s.textureTop??"dirt")}}const s_=n=>{const e=new Po("#e8f4ff",.3),t=new cu("#bfe3ff","#4f5b3f",.9),i=new nr("#ffe8b9",1.45),s=new vt;return i.castShadow=!0,i.shadow.mapSize.set(1536,1536),i.shadow.camera.near=1,i.shadow.camera.far=190,i.shadow.camera.left=-58,i.shadow.camera.right=58,i.shadow.camera.top=58,i.shadow.camera.bottom=-58,i.shadow.bias=-25e-5,i.shadow.normalBias=.02,i.target=s,n.add(e,t,i,s),{ambient:e,skyBounce:t,sun:i,sunTarget:s}},Zl=(n,e,t)=>{n.sun.position.set(e+52,78,t+34),n.sunTarget.position.set(e,12,t),n.sunTarget.updateMatrixWorld()},yt=64,r_=()=>{const n=document.createElement("canvas");n.width=yt,n.height=yt;const e=n.getContext("2d");return e&&(e.clearRect(0,0,yt,yt),e.fillStyle="#d9ab84",e.fillRect(8,8,8,8),e.fillRect(20,20,8,12),e.fillStyle="#5a86c8",e.fillRect(44,20,4,12),e.fillRect(36,52,4,12),e.fillStyle="#3a4f78",e.fillRect(4,20,4,12),e.fillRect(20,52,4,12)),n},Jl=n=>{const e=new Zc(n);return e.magFilter=Dt,e.minFilter=Dt,e.colorSpace=St,e.wrapS=En,e.wrapT=En,e.generateMipmaps=!1,e.needsUpdate=!0,e},eo=(n,e,t,i,s)=>{const r=n.getImageData(e,t,i,s);for(let a=0;a<i;a+=1)for(let o=0;o<s;o+=1){const l=(a+o*i)*4;if(r.data[l+3]!==255)return!0}return!1},a_=(n,e,t,i,s)=>{const r=n.getImageData(e,t,i,s);for(let a=0;a<i;a+=1)for(let o=0;o<s;o+=1){const l=(a+o*i)*4;if(!(r.data[l+0]===0&&r.data[l+1]===0&&r.data[l+2]===0&&r.data[l+3]===255))return!1}return!0},o_=(n,e,t,i,s)=>{const r=n.getImageData(e,t,i,s);for(let a=0;a<i;a+=1)for(let o=0;o<s;o+=1){const l=(a+o*i)*4;if(!(r.data[l+0]===255&&r.data[l+1]===255&&r.data[l+2]===255&&r.data[l+3]===255))return!1}return!0},Do=n=>n/64,Ql=(n,e,t)=>{if(t){if(eo(n,0,0,e,e))return}else if(eo(n,0,0,e,e/2))return;const i=Do(e),s=(r,a,o,l)=>{n.clearRect(r*i,a*i,o*i,l*i)};s(40,0,8,8),s(48,0,8,8),s(32,8,8,8),s(40,8,8,8),s(48,8,8,8),s(56,8,8,8),t&&(s(4,32,4,4),s(8,32,4,4),s(0,36,4,12),s(4,36,4,12),s(8,36,4,12),s(12,36,4,12),s(20,32,8,4),s(28,32,8,4),s(16,36,4,12),s(20,36,8,12),s(28,36,4,12),s(32,36,8,12),s(44,32,4,4),s(48,32,4,4),s(40,36,4,12),s(44,36,4,12),s(48,36,4,12),s(52,36,12,12),s(4,48,4,4),s(8,48,4,4),s(0,52,4,12),s(4,52,4,12),s(8,52,4,12),s(12,52,4,12),s(52,48,4,4),s(56,48,4,4),s(48,52,4,12),s(52,52,4,12),s(56,52,4,12),s(60,52,4,12))},l_=(n,e)=>{n.save(),n.scale(-1,1);const t=Do(e),i=(s,r,a,o,l,c)=>{n.drawImage(n.canvas,s*t,r*t,a*t,o*t,-l*t,c*t,-a*t,o*t)};i(4,16,4,4,20,48),i(8,16,4,4,24,48),i(0,20,4,12,24,52),i(4,20,4,12,20,52),i(8,20,4,12,16,52),i(12,20,4,12,28,52),i(44,16,4,4,36,48),i(48,16,4,4,40,48),i(40,20,4,12,40,52),i(44,20,4,12,36,52),i(48,20,4,12,32,52),i(52,20,4,12,44,52),n.restore()},c_=n=>{const e=Do(n.width),t=n.getContext("2d",{willReadFrequently:!0});if(!t)return"classic";const i=(o,l,c,d)=>eo(t,o*e,l*e,c*e,d*e),s=(o,l,c,d)=>a_(t,o*e,l*e,c*e,d*e),r=(o,l,c,d)=>o_(t,o*e,l*e,c*e,d*e);return i(50,16,2,4)||i(54,20,2,12)||i(42,48,2,4)||i(46,52,2,12)||s(50,16,2,4)&&s(54,20,2,12)&&s(42,48,2,4)&&s(46,52,2,12)||r(50,16,2,4)&&r(54,20,2,12)&&r(42,48,2,4)&&r(46,52,2,12)?"slim":"classic"},d_=async n=>new Promise((e,t)=>{const i=new Image;i.onload=()=>e(i),i.onerror=()=>t(new Error("Skin image load error")),i.src=n}),h_=n=>{const e=document.createElement("canvas");e.width=yt,e.height=yt;const t=e.getContext("2d",{willReadFrequently:!0});if(!t)return{canvas:e,model:"classic"};t.imageSmoothingEnabled=!1,t.clearRect(0,0,yt,yt);const i=n.width===n.height*2;if(!i&&n.width!==n.height)throw new Error(`Bad skin size: ${n.width}x${n.height}`);return i?(t.drawImage(n,0,0,yt,yt/2),l_(t,yt),Ql(t,yt,!1)):(t.drawImage(n,0,0,yt,yt),Ql(t,yt,!0)),{canvas:e,model:c_(e)}},Ei=(n,e,t,i,s,r)=>[new Ye(n/s,1-i/r),new Ye(t/s,1-i/r),new Ye(t/s,1-e/r),new Ye(n/s,1-e/r)],u_=(n,e,t,i,s,r,a,o)=>{const l=Ei(e+r,t,e+i+r,t+r,a,o),c=Ei(e+i+r,t,e+i*2+r,t+r,a,o),d=Ei(e,t+r,e+r,t+r+s,a,o),h=Ei(e+r,t+r,e+i+r,t+r+s,a,o),u=Ei(e+i+r,t+r,e+i+r*2,t+s+r,a,o),p=Ei(e+i+r*2,t+r,e+i*2+r*2,t+s+r,a,o),g=[u[3],u[2],u[0],u[1]],v=[d[3],d[2],d[0],d[1]],m=[l[3],l[2],l[0],l[1]],f=[c[0],c[1],c[3],c[2]],M=[h[3],h[2],h[0],h[1]],w=[p[3],p[2],p[0],p[1]],b=[];for(const T of[g,v,m,f,M,w])for(const P of T)b.push(P.x,P.y);const C=n.getAttribute("uv");C.set(new Float32Array(b)),C.needsUpdate=!0},f_=(n,e,t,i,s,r)=>{u_(n,e,t,i,s,r,yt,yt)},Bs=.42,Mi=.01,p_=16,ld=n=>{const e=n.image;if(!(e instanceof HTMLCanvasElement))return null;const t=e.getContext("2d",{willReadFrequently:!0});if(!t)return null;const i=t.getImageData(0,0,e.width,e.height);return{width:e.width,height:e.height,data:i.data}},m_=(n,e,t)=>{if(e<0||t<0||e>=n.width||t>=n.height)return{r:0,g:0,b:0,a:0};const i=(t*n.width+e)*4;return{r:n.data[i],g:n.data[i+1],b:n.data[i+2],a:n.data[i+3]}},g_=(n,e,t,i)=>new dr({color:n<<16|e<<8|t,transparent:i<255,opacity:Math.max(.02,i/255),alphaTest:.02,side:un,depthWrite:i>=254}),__=(n,e,t,i,s)=>({top:{x:n+s,y:e,w:t,h:s},bottom:{x:n+t+s,y:e,w:t,h:s},left:{x:n,y:e+s,w:s,h:i},front:{x:n+s,y:e+s,w:t,h:i},right:{x:n+t+s,y:e+s,w:s,h:i},back:{x:n+t+s*2,y:e+s,w:t,h:i}}),A_=(n,e,t,i,s,r=[])=>{const a=new Wt;if(!n)return a;const o=__(s[0],s[1],e,t,i),l=new Set(r),c=new Map,d=Bs/2,h=new Yt(Bs/16,1/16,1/16),u=new Yt(1/16,Bs/16,1/16),p=new Yt(1/16,1/16,Bs/16),g=(v,m,f)=>{const M=t/2-f-.5;switch(v){case"front":return{x:-e/2+m+.5,y:M,z:i/2+d+Mi,geometry:p};case"back":return{x:e/2-m-.5,y:M,z:-i/2-d-Mi,geometry:p};case"right":return{x:e/2+d+Mi,y:M,z:i/2-m-.5,geometry:h};case"left":return{x:-e/2-d-Mi,y:M,z:-i/2+m+.5,geometry:h};case"top":return{x:-e/2+m+.5,y:t/2+d+Mi,z:-i/2+f+.5,geometry:u};default:return{x:-e/2+m+.5,y:-t/2-d-Mi,z:i/2-f-.5,geometry:u}}};return Object.keys(o).forEach(v=>{if(l.has(v))return;const m=o[v];for(let f=0;f<m.h;f+=1)for(let M=0;M<m.w;M+=1){const w=m.x+M,b=m.y+f,{r:C,g:T,b:P,a:N}=m_(n,w,b);if(N<p_)continue;const E=C<<24|T<<16|P<<8|N;let S=c.get(E);S||(S=g_(C,T,P,N),c.set(E,S));const I=g(v,M,f),B=new Et(I.geometry,S);B.position.set(I.x/16,I.y/16,I.z/16),B.castShadow=!0,B.receiveShadow=!0,a.add(B)}}),a},v_=(n,e,t,i,s,r)=>{const a=new Yt(n/16,e/16,t/16);f_(a,i,s,n,e,t);const o=new dr({map:r,side:un,transparent:!1}),l=new Et(a,o);return l.castShadow=!0,l.receiveShadow=!0,l},ti=(n,e)=>{const t=new Wt,i=v_(e.width,e.height,e.depth,e.innerUv[0],e.innerUv[1],e.texture),s=A_(e.sampler,e.width,e.height,e.depth,e.outerUv,e.hiddenOverlayFaces);t.add(i,s),t.position.set(...e.position),n.add(t)},Li=async n=>{if(!n){const i=r_();return{texture:Jl(i),model:"classic"}}const e=await d_(n),t=h_(e);return{texture:Jl(t.canvas),model:t.model}},y_=(n,e="classic")=>{const t=new Wt,i=e==="slim"?3:4,s=e==="slim"?5.5/16:6/16,r=ld(n);return ti(t,{width:8,height:8,depth:8,innerUv:[0,0],outerUv:[32,0],sampler:r,position:[0,28/16,0],texture:n}),ti(t,{width:8,height:12,depth:4,innerUv:[16,16],outerUv:[16,32],sampler:r,hiddenOverlayFaces:["left","right"],position:[0,18/16,0],texture:n}),ti(t,{width:i,height:12,depth:4,innerUv:[40,16],outerUv:[40,32],sampler:r,hiddenOverlayFaces:["right","top"],position:[-s,18/16,0],texture:n}),ti(t,{width:i,height:12,depth:4,innerUv:[32,48],outerUv:[48,48],sampler:r,hiddenOverlayFaces:["left","top"],position:[s,18/16,0],texture:n}),ti(t,{width:4,height:12,depth:4,innerUv:[0,16],outerUv:[0,32],sampler:r,hiddenOverlayFaces:["right"],position:[-2/16,6/16,-.1/16],texture:n}),ti(t,{width:4,height:12,depth:4,innerUv:[16,48],outerUv:[0,48],sampler:r,hiddenOverlayFaces:["left"],position:[2/16,6/16,-.1/16],texture:n}),t},b_=(n,e="classic")=>{const t=e==="slim"?3:4,i=new Wt,s=new Wt,r=ld(n);return ti(s,{width:t,height:12,depth:4,innerUv:[40,16],outerUv:[40,32],sampler:r,position:[0,0,0],texture:n}),s.rotation.set(Math.PI,Math.PI,0),i.add(s),i.position.x=.12,i.position.y=-.01,i.position.z=.045,i.rotation.x=-.14,i.rotation.y=-.8,i.rotation.z=.44,i.scale.set(1.25,1.25,1.25),i},to=n=>{const e=new Set,t=new Set,i=new Set;n.traverse(s=>{const r=s;if(r.geometry){const a=r.geometry;e.has(a)||(a.dispose(),e.add(a))}r.material&&(Array.isArray(r.material)?r.material:[r.material]).forEach(o=>{const l=o;l.map&&!i.has(l.map)&&(l.map.dispose(),i.add(l.map)),t.has(l)||(l.dispose(),t.add(l))})})};class S_{group=new Wt;constructor(){const e=new wn({side:Lt,uniforms:{topColor:{value:new Ue("#7eb8f7")},horizonColor:{value:new Ue("#c9e6ff")},bottomColor:{value:new Ue("#f7ddb1")},sunDirection:{value:{x:.28,y:.82,z:.46}}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDirection;
        varying vec3 vWorldPosition;
        void main() {
          vec3 dir = normalize(vWorldPosition);
          float h = dir.y * 0.5 + 0.5;
          vec3 color = mix(bottomColor, horizonColor, smoothstep(0.0, 0.45, h));
          color = mix(color, topColor, smoothstep(0.45, 1.0, h));
          float sunDot = max(dot(dir, normalize(sunDirection)), 0.0);
          float sunDisc = smoothstep(0.992, 0.9994, sunDot);
          float halo = pow(sunDot, 26.0);
          float rays = pow(sunDot, 9.0) * (0.5 + 0.5 * sin(atan(dir.x - sunDirection.x, dir.y - sunDirection.y) * 16.0));
          color += vec3(1.0, 0.88, 0.62) * sunDisc * 0.95;
          color += vec3(1.0, 0.82, 0.48) * halo * 0.3;
          color += vec3(1.0, 0.86, 0.65) * rays * 0.08;
          gl_FragColor = vec4(color, 1.0);
        }
      `,depthWrite:!1}),t=new Et(new Ro(280,24,16),e);t.frustumCulled=!1,this.group.add(t);const i=new as({color:"#ffffff",transparent:!0,opacity:.18,depthWrite:!1}),s=new Yt(10,2.4,6);[[-70,54,-50],[48,60,-20],[96,58,36],[-108,62,18],[8,56,88],[-34,64,104]].forEach(([a,o,l],c)=>{const d=new Et(s,i);d.position.set(a,o,l),d.scale.set(1.4+c%3*.24,1,1.15+c%2*.18),d.rotation.y=c*.28,this.group.add(d)})}update(e,t){this.group.position.set(e,0,t)}}const xe=16,Fs=4,ec=["grass_top","grass_side","dirt","stone","wood_side","wood_top","leaves","bedrock","planks","crafting_table_top","crafting_table_side","stone_bricks","water","sand","clay","mud","grass_plant","flower_red"],es=(n,e,t)=>{let i=Math.imul(n+t*157,374761393)^Math.imul(e+t*311,668265263);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967295},no=(n,e)=>n[Math.min(n.length-1,Math.floor(e*n.length))],Rt=(n,e,t,i,s)=>{for(let r=0;r<xe;r+=1)for(let a=0;a<xe;a+=1)n.fillStyle=no(i,es(a,r,s)),n.fillRect(e+a,t+r,1,1)},Zi=(n,e,t,i,s,r=.25)=>{const a=n.createLinearGradient(0,t,0,t+xe);a.addColorStop(0,i),a.addColorStop(1,s),n.globalAlpha=r,n.fillStyle=a,n.fillRect(e,t,xe,xe),n.globalAlpha=1},tn=(n,e,t,i,s,r)=>{n.fillStyle=i;for(let a=0;a<xe;a+=1)for(let o=0;o<xe;o+=1)es(o,a,s)>r&&n.fillRect(e+o,t+a,1,1)};class E_{material;tileMap=new Map;constructor(){const e=document.createElement("canvas");e.width=Fs*xe,e.height=Math.ceil(ec.length/Fs)*xe;const t=e.getContext("2d");if(!t)throw new Error("Unable to create texture atlas.");t.imageSmoothingEnabled=!1,ec.forEach((s,r)=>{const a=r%Fs,o=Math.floor(r/Fs),l=a*xe,c=o*xe;this.drawTile(t,s,l,c);const d=.5;this.tileMap.set(s,{u0:(l+d)/e.width,v0:(c+d)/e.height,u1:(l+xe-d)/e.width,v1:(c+xe-d)/e.height})});const i=new Zc(e);i.magFilter=Dt,i.minFilter=Dt,i.colorSpace=St,i.generateMipmaps=!1,i.flipY=!1,this.material=new dr({map:i,transparent:!0,alphaTest:.35})}getTileRect(e){const t=this.tileMap.get(e);if(!t)throw new Error(`Unknown atlas tile ${e}`);return t}drawTile(e,t,i,s){switch(t){case"grass_top":Rt(e,i,s,["#4b8038","#5a9441","#67a74a","#79bb58"],11),tn(e,i,s,"#8ecb69",12,.9),tn(e,i,s,"#3f6f31",13,.92),Zi(e,i,s,"#fef08a","#000000",.08);break;case"grass_side":Rt(e,i,s,["#71462a","#7b4d2e","#845735","#8d5f3c"],21);for(let r=0;r<5;r+=1)for(let a=0;a<xe;a+=1){const o=es(a,r,22);e.fillStyle=no(["#4f873a","#5d9842","#6aad4e","#7bbe60"],o),e.fillRect(i+a,s+r,1,1)}e.fillStyle="#5f9d45";for(let r=1;r<xe;r+=2){const a=1+Math.floor(es(r,6,23)*3);e.fillRect(i+r,s+5,1,a)}break;case"dirt":Rt(e,i,s,["#6d4327","#78492c","#845233","#915b3a"],31),tn(e,i,s,"#ab774f",32,.93),tn(e,i,s,"#59361f",33,.94);break;case"stone":Rt(e,i,s,["#6f7379","#7d8289","#8c9299","#999fa6"],41),e.fillStyle="#60646a";for(let r=3;r<xe;r+=5)e.fillRect(i,s+r,xe,1);tn(e,i,s,"#b2b7bf",42,.94);break;case"wood_side":Rt(e,i,s,["#6f4929","#7b5330","#885d36","#956844"],51),e.fillStyle="#5f3f24";for(let r=1;r<xe;r+=3)e.fillRect(i+r,s,1,xe);Zi(e,i,s,"#f5d7a6","#000000",.1);break;case"wood_top":for(let r=0;r<xe;r+=1)for(let a=0;a<xe;a+=1){const o=a-7.5,l=r-7.5,d=(Math.sin(Math.hypot(o,l)*1.8+es(a,r,61)*.8)*.5+.5)*.8+.2;e.fillStyle=no(["#7b522d","#8b6238","#9f7546","#b28653"],d),e.fillRect(i+a,s+r,1,1)}e.fillStyle="#5e3f22",e.fillRect(i+7,s,1,xe),e.fillRect(i,s+7,xe,1);break;case"leaves":Rt(e,i,s,["#356937","#3e7840","#4e8b4e","#5f9f5b"],71),tn(e,i,s,"#2d572e",72,.91),tn(e,i,s,"#78bb71",73,.93);break;case"bedrock":Rt(e,i,s,["#2c2f33","#34383d","#3d4247","#474c52"],81),e.fillStyle="#1d2024",e.fillRect(i+2,s+4,11,1),e.fillRect(i+4,s+9,8,1);break;case"planks":Rt(e,i,s,["#b5834c","#bf8b52","#cb9861","#d7a56e"],91),e.fillStyle="#8a5d34";for(let r=4;r<xe;r+=6)e.fillRect(i,s+r,xe,1);Zi(e,i,s,"#f9d7a1","#000000",.09);break;case"crafting_table_top":Rt(e,i,s,["#6d4b2c","#7a5632","#87603a","#946e43"],101),e.fillStyle="#c99d66",e.fillRect(i+1,s+1,xe-2,1),e.fillRect(i+1,s+xe-2,xe-2,1),e.fillRect(i+1,s+1,1,xe-2),e.fillRect(i+xe-2,s+1,1,xe-2),e.fillStyle="#5f3f24",e.fillRect(i+4,s+4,xe-8,xe-8);break;case"crafting_table_side":Rt(e,i,s,["#79512f","#865b36","#93653d","#9f7249"],111),e.fillStyle="#5d3c22",e.fillRect(i+2,s+2,xe-4,xe-4),e.fillStyle="#b78c57",e.fillRect(i+4,s+4,xe-8,3),e.fillRect(i+4,s+9,xe-8,3);break;case"stone_bricks":Rt(e,i,s,["#7b7f85","#878c93","#949aa2","#a0a6ad"],121),e.fillStyle="#5e6268",e.fillRect(i,s+5,xe,1),e.fillRect(i,s+11,xe,1),e.fillRect(i+6,s,1,6),e.fillRect(i+12,s+5,1,7),tn(e,i,s,"#c0c5cd",122,.95);break;case"water":Rt(e,i,s,["#356eb5","#3f7dc6","#4f90db","#5ca2ea"],131),Zi(e,i,s,"#d6f2ff","#0c2f66",.22),e.fillStyle="rgba(255,255,255,0.24)";for(let r=2;r<xe;r+=5)e.fillRect(i,s+r,xe,1);break;case"sand":Rt(e,i,s,["#c6b172","#d1bb7d","#dbc78e","#e4d49f"],141),tn(e,i,s,"#b29d63",142,.92);break;case"clay":Rt(e,i,s,["#7f93a8","#8ea2b7","#9eb1c5","#aebfd0"],151),tn(e,i,s,"#6a7e95",152,.93);break;case"mud":Rt(e,i,s,["#3f382f","#4a4238","#564d42","#62584b"],161),Zi(e,i,s,"#8f7d65","#261f18",.17),tn(e,i,s,"#746652",162,.93);break;case"grass_plant":e.fillStyle="#00000000",e.fillRect(i,s,xe,xe),e.fillStyle="#5ca246";for(let r=xe-1;r>=4;r-=1){const a=3+Math.floor((xe-r)/4),o=xe-a-1;e.fillRect(i+a,s+r,1,1),e.fillRect(i+o,s+r,1,1)}e.fillStyle="#7ec960",e.fillRect(i+7,s+4,2,xe-4);break;case"flower_red":e.fillStyle="#00000000",e.fillRect(i,s,xe,xe),e.fillStyle="#5e9f49",e.fillRect(i+7,s+6,2,xe-6),e.fillStyle="#dd5a52",e.fillRect(i+4,s+2,8,5),e.fillStyle="#f2d7a5",e.fillRect(i+7,s+4,2,2);break;default:e.fillStyle="#ff00ff",e.fillRect(i,s,xe,xe)}}}const Vs=75,M_=4.65,x_=5.45,tc=.98,nc=-.93,ic=-.96,sc=-.28,rc=-.34,ac=-.09,Qr=1.15,w_=.01,T_=12,oc={bobSpeed:3.8,walkBobX:.036,walkBobY:.018,walkBobZ:.009,swingDuration:.24,swingPitch:.62,swingYaw:.23,swingRoll:.41,swingForward:.09,swingRight:.11,mineSpeed:9.2,minePitch:1.12,mineYaw:.36,mineRoll:.58,mineForward:.16},R_={bobSpeed:3.4,walkBobX:.026,walkBobY:.014,walkBobZ:.007,swingDuration:.22,swingPitch:.42,swingYaw:.18,swingRoll:.29,swingForward:.065,swingRight:.08,mineSpeed:7.1,minePitch:.68,mineYaw:.24,mineRoll:.31,mineForward:.09};class C_{scene=new tr;camera=new It(Vs,1,.1,500);handScene=new tr;handCamera=new It(Vs,1,w_,T_);atlas=new E_;sky=new S_;renderer;chunkMeshes=new Map;droppedItems=new Map;breakParticles=[];lights;miningOverlay;handRig=new Wt;handModel=null;handPhase=0;miningPhase=0;miningBlend=0;wasMiningActive=!1;actionTimer=0;actionStrength=0;jumpTimer=0;jumpStrength=0;handAnimationProfile={...oc};skinRequestId=0;constructor(e){this.renderer=new Lo({canvas:e,antialias:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.25)),this.renderer.setSize(e.clientWidth||window.innerWidth,e.clientHeight||window.innerHeight,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Pc,this.renderer.outputColorSpace=St,this.renderer.toneMapping=Ic,this.renderer.toneMappingExposure=1.03,this.renderer.setClearColor(new Ue(Ge.skyColor)),this.scene.background=new Ue(Ge.skyColor),this.scene.fog=new wo(new Ue("#95b9dd"),60,190),this.scene.add(this.sky.group),this.scene.add(this.camera),this.handScene.add(this.handCamera),this.handCamera.add(this.handRig),this.handRig.position.set(tc,nc,ic),this.handRig.rotation.set(sc,rc,ac),this.handRig.scale.set(Qr,Qr,Qr);const t=new Po("#ffffff",.6),i=new nr("#fff2db",.95);i.position.set(1.6,2.2,2.1),this.handScene.add(t,i),this.lights=s_(this.scene),Zl(this.lights,0,0),this.setPlayerSkin(null),this.miningOverlay=new Et(new Yt(1.01,1.01,1.01),new as({color:"#111317",transparent:!0,opacity:0,depthWrite:!1})),this.miningOverlay.visible=!1,this.miningOverlay.renderOrder=10,this.scene.add(this.miningOverlay)}resize(e,t){this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.handCamera.aspect=e/t,this.handCamera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(e,t,!1)}setCameraTransform(e,t,i){this.camera.position.set(e.x,e.y,e.z),this.camera.rotation.order="YXZ",this.camera.rotation.y=t,this.camera.rotation.x=i,this.sky.update(e.x,e.z),Zl(this.lights,e.x,e.z)}upsertChunkMesh(e,t,i){const s=this.chunkMeshes.get(e);if(t.getAttribute("position").count===0){t.dispose(),s&&(this.scene.remove(s),s.geometry.dispose(),this.chunkMeshes.delete(e));return}if(s){s.geometry.dispose(),s.geometry=t,s.position.set(i.x,0,i.z);return}const r=new Et(t,this.atlas.material);r.position.set(i.x,0,i.z),r.castShadow=!0,r.receiveShadow=!0,this.scene.add(r),this.chunkMeshes.set(e,r)}removeChunkMesh(e){const t=this.chunkMeshes.get(e);t&&(this.scene.remove(t),t.geometry.dispose(),this.chunkMeshes.delete(e))}clearChunks(){for(const e of[...this.chunkMeshes.keys()])this.removeChunkMesh(e)}setPlayerSkin(e){this.applyPlayerSkin(e)}setFirstPersonHandVisible(e){this.handRig.visible=e}setFirstPersonAnimationPreset(e){this.handAnimationProfile=e==="item"?{...R_}:{...oc}}setFirstPersonAnimationProfile(e){this.handAnimationProfile={...this.handAnimationProfile,...e}}triggerFirstPersonAction(e=1){const t=Math.max(.25,Math.min(1.6,e));this.actionStrength=Math.max(this.actionStrength,t),this.actionTimer=this.handAnimationProfile.swingDuration}triggerFirstPersonJump(e=1){const t=Math.max(.3,Math.min(1,e));this.jumpStrength=Math.max(this.jumpStrength,t),this.jumpTimer=.16}updateHand(e,t,i){const s=this.handAnimationProfile;this.handPhase+=e*(s.bobSpeed+t*4.4);const r=Math.max(0,t-.04),a=Math.sin(this.handPhase),o=a*(r*s.walkBobX),l=(1-Math.cos(this.handPhase*2))*.5*r*s.walkBobY*.42,c=a*r*s.walkBobZ*.22;this.actionTimer>0&&(this.actionTimer=Math.max(0,this.actionTimer-e));const d=s.swingDuration>0?1-this.actionTimer/s.swingDuration:1,h=Math.max(0,Math.min(1,d)),u=Math.sin(h*Math.PI)*Math.min(1,this.actionStrength);this.actionTimer<=0&&(this.actionStrength=Math.max(0,this.actionStrength-e*8)),this.jumpTimer>0&&(this.jumpTimer=Math.max(0,this.jumpTimer-e));const p=1-this.jumpTimer/.16,g=Math.max(0,Math.min(1,p)),m=(this.jumpTimer>0?Math.sin(g*Math.PI):0)*this.jumpStrength;this.jumpTimer<=0&&(this.jumpStrength=Math.max(0,this.jumpStrength-e*7.5)),i&&!this.wasMiningActive&&(this.miningPhase=0,this.miningBlend=0);const f=i?1:0,M=i?26:7;this.miningBlend+=(f-this.miningBlend)*Math.min(1,e*M);const w=.9+this.miningBlend*1.9;this.miningPhase+=e*s.mineSpeed*w;const b=(Math.sin(this.miningPhase)+1)*.5,C=(Math.sin(this.miningPhase*2+.35)+1)*.5,T=this.miningBlend*(b*.78+C*.22);this.wasMiningActive=i;const P=T+u;this.handRig.position.x=tc+o+P*.11,this.handRig.position.y=nc-l-P*.058-m*.018,this.handRig.position.z=ic+c+-P*s.mineForward+m*.01,this.handRig.rotation.x=sc-t*.022-P*s.minePitch-m*.06,this.handRig.rotation.y=rc+P*s.mineYaw,this.handRig.rotation.z=ac-P*s.mineRoll+m*.024}updateSpeedFov(e,t,i,s){const r=t&&i?Vs+(s?M_:x_):Vs,a=1-Math.exp(-e*10),o=this.camera.fov+(r-this.camera.fov)*a;Math.abs(o-this.camera.fov)>.01&&(this.camera.fov=o,this.camera.updateProjectionMatrix(),this.handCamera.fov=o,this.handCamera.updateProjectionMatrix())}spawnDroppedItem(e,t,i,s,r){const a=this.droppedItems.get(e);a&&(this.scene.remove(a),a.geometry.dispose(),a.material.dispose());const o=new Et(new Yt(.26,.26,.26),new dr({color:new Ue(t)}));o.position.set(i,s,r),o.castShadow=!0,o.receiveShadow=!0,this.scene.add(o),this.droppedItems.set(e,o)}updateDroppedItem(e,t,i,s,r,a){const o=this.droppedItems.get(e);o&&(o.position.set(t,i+a,s),o.rotation.y=r)}removeDroppedItem(e){const t=this.droppedItems.get(e);t&&(this.scene.remove(t),t.geometry.dispose(),t.material.dispose(),this.droppedItems.delete(e))}clearDroppedItems(){for(const e of[...this.droppedItems.keys()])this.removeDroppedItem(e)}spawnBreakParticles(e,t,i,s){for(let r=0;r<11;r+=1){const a=new Et(new Yt(.08,.08,.08),new as({color:new Ue(e),transparent:!0,opacity:.9}));a.position.set(t+.5+(Math.random()-.5)*.6,i+.5+(Math.random()-.5)*.6,s+.5+(Math.random()-.5)*.6),this.scene.add(a),this.breakParticles.push({mesh:a,velocity:new O((Math.random()-.5)*4.5,Math.random()*3.2+1.2,(Math.random()-.5)*4.5),lifeMs:360+Math.random()*260,maxLifeMs:360+Math.random()*260})}}updateTransientEffects(e){const t=e*1e3;for(let i=this.breakParticles.length-1;i>=0;i-=1){const s=this.breakParticles[i];s.lifeMs-=t,s.velocity.y-=12.5*e,s.mesh.position.x+=s.velocity.x*e,s.mesh.position.y+=s.velocity.y*e,s.mesh.position.z+=s.velocity.z*e,s.mesh.rotation.x+=e*8,s.mesh.rotation.y+=e*10;const r=Math.max(0,s.lifeMs/s.maxLifeMs),a=s.mesh.material;a.opacity=r,s.mesh.scale.setScalar(Math.max(.2,r)),s.lifeMs<=0&&(this.scene.remove(s.mesh),s.mesh.geometry.dispose(),a.dispose(),this.breakParticles.splice(i,1))}}setMiningOverlay(e,t){if(!e||t<=0){this.miningOverlay.visible=!1;return}const i=this.miningOverlay.material,s=Math.max(0,Math.min(1,t));i.opacity=.08+s*.4,this.miningOverlay.scale.setScalar(1.005+s*.02),this.miningOverlay.position.set(e.blockWorldX+.5,e.blockWorldY+.5,e.blockWorldZ+.5),this.miningOverlay.visible=!0}render(){this.renderer.autoClear=!0,this.renderer.render(this.scene,this.camera),this.handRig.visible&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.handScene,this.handCamera),this.renderer.autoClear=!0)}async applyPlayerSkin(e){const t=++this.skinRequestId;let i=await Li(null);if(e)try{i=await Li(e)}catch{i=await Li(null)}if(t!==this.skinRequestId){i.texture.dispose();return}this.handModel&&(this.handRig.remove(this.handModel),to(this.handModel),this.handModel=null),this.handModel=b_(i.texture,i.model),this.handRig.add(this.handModel)}}const io=(n,e)=>e.some(t=>n instanceof t);let lc,cc;function P_(){return lc||(lc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function I_(){return cc||(cc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const so=new WeakMap,ea=new WeakMap,ur=new WeakMap;function L_(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",a)},r=()=>{t(ri(n.result)),s()},a=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",a)});return ur.set(e,n),e}function D_(n){if(so.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",a),n.removeEventListener("abort",a)},r=()=>{t(),s()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",a),n.addEventListener("abort",a)});so.set(n,e)}let ro={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return so.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ri(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function cd(n){ro=n(ro)}function k_(n){return I_().includes(n)?function(...e){return n.apply(ao(this),e),ri(this.request)}:function(...e){return ri(n.apply(ao(this),e))}}function N_(n){return typeof n=="function"?k_(n):(n instanceof IDBTransaction&&D_(n),io(n,P_())?new Proxy(n,ro):n)}function ri(n){if(n instanceof IDBRequest)return L_(n);if(ea.has(n))return ea.get(n);const e=N_(n);return e!==n&&(ea.set(n,e),ur.set(e,n)),e}const ao=n=>ur.get(n);function U_(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const a=indexedDB.open(n,e),o=ri(a);return i&&a.addEventListener("upgradeneeded",l=>{i(ri(a.result),l.oldVersion,l.newVersion,ri(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),o.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const O_=["get","getKey","getAll","getAllKeys","count"],B_=["put","add","delete","clear"],ta=new Map;function dc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ta.get(e))return ta.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=B_.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||O_.includes(t)))return;const r=async function(a,...o){const l=this.transaction(a,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(o.shift())),(await Promise.all([c[t](...o),s&&l.done]))[0]};return ta.set(e,r),r}cd(n=>({...n,get:(e,t,i)=>dc(e,t)||n.get(e,t,i),has:(e,t)=>!!dc(e,t)||n.has(e,t)}));const F_=["continue","continuePrimaryKey","advance"],hc={},oo=new WeakMap,dd=new WeakMap,V_={get(n,e){if(!F_.includes(e))return n[e];let t=hc[e];return t||(t=hc[e]=function(...i){oo.set(this,dd.get(this)[e](...i))}),t}};async function*z_(...n){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...n)),!e)return;e=e;const t=new Proxy(e,V_);for(dd.set(t,e),ur.set(t,ao(e));e;)yield t,e=await(oo.get(t)||e.continue()),oo.delete(t)}function uc(n,e){return e===Symbol.asyncIterator&&io(n,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&io(n,[IDBIndex,IDBObjectStore])}cd(n=>({...n,get(e,t,i){return uc(e,t)?z_:n.get(e,t,i)},has(e,t){return uc(e,t)||n.has(e,t)}}));const lo=()=>({blocksMined:0,blocksPlaced:0,distanceTravelled:0,playTimeMs:0,jumps:0,craftedItems:0}),sr=()=>({totalBlocksMined:0,totalBlocksPlaced:0,totalDistanceTravelled:0,totalPlayTimeMs:0,totalJumps:0,totalCraftedItems:0,worldsCreated:0}),ht=n=>typeof n=="number"&&Number.isFinite(n),hd=n=>ht(n)&&Number.isInteger(n)&&n>=0&&n<=15,na=n=>Array.isArray(n)&&n.length===3&&n.every(e=>ht(e)),ls=n=>n===null||typeof n=="string",js=n=>typeof n=="string"&&n.length>0,G_=n=>ht(n)&&Number.isInteger(n)&&n>=uo&&n<=fo,ud=n=>{if(!n||typeof n!="object")return!1;const e=n;return ht(e.blocksMined)&&ht(e.blocksPlaced)&&ht(e.distanceTravelled)&&ht(e.playTimeMs)&&ht(e.jumps)&&ht(e.craftedItems)},fd=n=>Array.isArray(n)&&n.every(e=>e&&typeof e=="object"&&ht(e.count)&&(e.blockId===null||hd(e.blockId))),pd=n=>{if(!n||typeof n!="object")return!1;const e=n;return na(e.position)&&na(e.velocity)&&na(e.spawnPoint)&&ht(e.yaw)&&ht(e.pitch)&&ht(e.selectedSlot)},yn=n=>{if(!n||typeof n!="object")return!1;const e=n,t=e.previewImageDataUrl;return e.schemaVersion===5&&typeof e.id=="string"&&e.id.length>0&&typeof e.worldId=="string"&&e.worldId.length>0&&typeof e.name=="string"&&e.name.length>0&&typeof e.seed=="string"&&(typeof t>"u"||ls(t))&&js(e.createdAt)&&js(e.updatedAt)&&js(e.lastPlayedAt)&&pd(e.player)&&fd(e.inventory)&&ud(e.worldStats)},H_=n=>{if(!n||typeof n!="object")return!1;const e=n;return e.schemaVersion===4&&e.worldId==="default-world"&&typeof e.seed=="string"&&js(e.createdAt)&&pd(e.player)&&fd(e.inventory)&&ud(e.worldStats)},md=n=>{if(!n||typeof n!="object")return!1;const e=n;return typeof e.chunkKey=="string"&&typeof e.revision=="number"&&Array.isArray(e.changes)&&e.changes.every(t=>t&&typeof t=="object"&&ht(t.index)&&hd(t.blockId))},ia=n=>{if(!md(n))return!1;const e=n;return typeof e.id=="string"&&e.id.length>0&&typeof e.worldId=="string"&&e.worldId.length>0},W_=n=>{if(!n||typeof n!="object")return!1;const e=n;return e.schemaVersion!==1||!e.keyBindings||typeof e.keyBindings!="object"?!1:$s.every(i=>{const s=e.keyBindings[i];return s&&typeof s=="object"&&typeof s.primary=="string"&&ls(s.secondary)})&&ls(e.skinDataUrl)&&(typeof e.startFullscreen=="boolean"||typeof e.startFullscreen>"u")&&(typeof e.interfaceSize>"u"||G_(e.interfaceSize))&&(typeof e.language>"u"||Dd(e.language))},fc=n=>{if(!n||typeof n!="object")return!1;const e=n;return e.schemaVersion===1&&ht(e.totalBlocksMined)&&ht(e.totalBlocksPlaced)&&ht(e.totalDistanceTravelled)&&ht(e.totalPlayTimeMs)&&ht(e.totalJumps)&&ht(e.totalCraftedItems)&&ht(e.worldsCreated)},sa=n=>{if(!n||typeof n!="object")return!1;const e=n;return e.schemaVersion===1&&ls(e.activeWorldId)&&ls(e.lastWorldId)},pc={schemaVersion:1,activeWorldId:null,lastWorldId:null},zs=n=>[...n].sort((e,t)=>{const i=Date.parse(e.lastPlayedAt||e.updatedAt||e.createdAt);return Date.parse(t.lastPlayedAt||t.updatedAt||t.createdAt)-i}),Jn=n=>({id:n.id,name:n.name,seed:n.seed,previewImageDataUrl:n.previewImageDataUrl??null,createdAt:n.createdAt,updatedAt:n.updatedAt,lastPlayedAt:n.lastPlayedAt,worldStats:{...n.worldStats}}),X_=n=>n.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,32);class Y_{dbPromise=null;migrationPromise=null;getDb(){return this.dbPromise||(this.dbPromise=U_("mineblow",pt.databaseVersion,{upgrade(e){e.objectStoreNames.contains("meta")||e.createObjectStore("meta"),e.objectStoreNames.contains("chunkDiffs")||e.createObjectStore("chunkDiffs"),e.objectStoreNames.contains("settings")||e.createObjectStore("settings"),e.objectStoreNames.contains("globalStats")||e.createObjectStore("globalStats"),e.objectStoreNames.contains("worlds")||e.createObjectStore("worlds")}})),this.dbPromise}async hasContinueState(){return await this.ensureMigrated(),await(await this.getDb()).count("worlds")>0}async listWorlds(){await this.ensureMigrated();const t=await(await this.getDb()).getAll("worlds");return zs(t.filter(yn).map(i=>Jn(i)))}async loadWorld(e){await this.ensureMigrated();const t=await this.getDb(),i=e??await this.getPreferredWorldId(t);if(!i)return null;const s=t.transaction(["worlds","chunkDiffs","meta"],"readwrite"),r=s.objectStore("worlds"),a=await r.get(i);if(!yn(a))return await s.done,null;const o=new Date().toISOString(),l={...a,updatedAt:o,lastPlayedAt:o};await r.put(l,l.id),await s.objectStore("meta").put({schemaVersion:1,activeWorldId:l.id,lastWorldId:l.id},pt.appMetaKey);const c=new Map,d=await s.objectStore("chunkDiffs").getAll();for(const h of d)ia(h)&&h.worldId===l.id&&c.set(h.chunkKey,{chunkKey:h.chunkKey,revision:h.revision,changes:h.changes});return await s.done,{save:l,chunkDiffs:c}}async loadWorldSummary(e){await this.ensureMigrated();const t=await this.getDb(),i=e??await this.getPreferredWorldId(t);if(!i)return null;const s=await t.get("worlds",i);return yn(s)?Jn(s):null}async createNewWorld(e,t,i,s,r){await this.ensureMigrated();const a=await this.getDb(),o=new Date().toISOString(),l=await this.createUniqueWorldId(e),c=e.trim()||`Nouveau monde ${new Date().toLocaleDateString("fr-CA")}`,d={schemaVersion:pt.schemaVersion,id:l,worldId:l,name:c,seed:t,previewImageDataUrl:null,createdAt:o,updatedAt:o,lastPlayedAt:o,player:i,inventory:s,worldStats:r},h=a.transaction(["worlds","meta","globalStats"],"readwrite");await h.objectStore("worlds").put(d,d.id),await h.objectStore("meta").put({schemaVersion:1,activeWorldId:d.id,lastWorldId:d.id},pt.appMetaKey);const u=await h.objectStore("globalStats").get("global"),p=fc(u)?u:{schemaVersion:1,...sr()};return await h.objectStore("globalStats").put({...p,worldsCreated:p.worldsCreated+1},"global"),await h.done,d}async renameWorld(e,t){await this.ensureMigrated();const i=await this.getDb(),s=await i.get("worlds",e);if(!yn(s))return null;const r=t.trim();if(!r)return Jn(s);const a={...s,name:r,updatedAt:new Date().toISOString()};return await i.put("worlds",a,a.id),Jn(a)}async saveWorldPreview(e,t){await this.ensureMigrated();const i=await this.getDb(),s=await i.get("worlds",e);if(!yn(s))return;const r=typeof t=="string"&&t.length>0?t:null;await i.put("worlds",{...s,previewImageDataUrl:r,updatedAt:new Date().toISOString()},s.id)}async deleteWorld(e){await this.ensureMigrated();const t=await this.getDb(),i=(await t.getAll("worlds")).filter(yn),s=await this.loadAppMeta(t),r=i.filter(u=>u.id!==e),a=zs(r.map(u=>Jn(u)))[0]?.id??null,o=t.transaction(["worlds","chunkDiffs","meta"],"readwrite");await o.objectStore("worlds").delete(e);const l=o.objectStore("chunkDiffs"),c=await l.getAllKeys(),d=await l.getAll();for(let u=0;u<d.length;u+=1){const p=d[u],g=c[u];ia(p)&&p.worldId===e&&typeof g=="string"&&await l.delete(g)}const h={schemaVersion:1,activeWorldId:s.activeWorldId===e?a:s.activeWorldId,lastWorldId:s.lastWorldId===e?a:s.lastWorldId};h.activeWorldId&&!r.some(u=>u.id===h.activeWorldId)&&(h.activeWorldId=a),h.lastWorldId&&!r.some(u=>u.id===h.lastWorldId)&&(h.lastWorldId=a),await o.objectStore("meta").put(h,pt.appMetaKey),await o.done}async savePlayer(e,t,i,s){await this.ensureMigrated();const r=await this.getDb(),a=await r.get("worlds",e);yn(a)&&await r.put("worlds",{...a,player:t,inventory:i,worldStats:s,updatedAt:new Date().toISOString()},a.id)}async saveChunkDiffs(e,t){if(await this.ensureMigrated(),t.length===0)return;const s=(await this.getDb()).transaction("chunkDiffs","readwrite"),r=s.objectStore("chunkDiffs");for(const a of t){const o=this.getChunkRecordKey(e,a.chunkKey);a.changes.length===0?await r.delete(o):await r.put({id:o,worldId:e,chunkKey:a.chunkKey,revision:a.revision,changes:a.changes},o)}await s.done}async clear(){const t=(await this.getDb()).transaction(["worlds","chunkDiffs","meta"],"readwrite");await t.objectStore("worlds").clear(),await t.objectStore("chunkDiffs").clear(),await t.objectStore("meta").delete(pt.appMetaKey),await t.objectStore("meta").delete(pt.legacyWorldId),await t.done}async loadSettings(){const t=await(await this.getDb()).get("settings","settings");if(W_(t))return{keyBindings:t.keyBindings,skinDataUrl:t.skinDataUrl,startFullscreen:t.startFullscreen??!0,interfaceSize:or(t.interfaceSize??Ri),language:t.language??zn};const i=Zs();return await this.saveSettings(i),i}async saveSettings(e){await(await this.getDb()).put("settings",{schemaVersion:1,...e},"settings")}async loadGlobalStats(){const t=await(await this.getDb()).get("globalStats","global");if(fc(t))return{totalBlocksMined:t.totalBlocksMined,totalBlocksPlaced:t.totalBlocksPlaced,totalDistanceTravelled:t.totalDistanceTravelled,totalPlayTimeMs:t.totalPlayTimeMs,totalJumps:t.totalJumps,totalCraftedItems:t.totalCraftedItems,worldsCreated:t.worldsCreated};const i=sr();return await this.saveGlobalStats(i),i}async saveGlobalStats(e){await(await this.getDb()).put("globalStats",{schemaVersion:1,...e},"global")}async ensureMigrated(){this.migrationPromise||(this.migrationPromise=this.runMigration()),await this.migrationPromise}async runMigration(){const e=await this.getDb(),t=(await e.getAll("worlds")).filter(yn),i=await e.get("meta",pt.appMetaKey);if(t.length>0){if(!sa(i)){const d=zs(t.map(h=>Jn(h)))[0]?.id??null;await e.put("meta",{schemaVersion:1,activeWorldId:d,lastWorldId:d},pt.appMetaKey)}return}const s=await e.get("meta",pt.legacyWorldId);if(!H_(s)){sa(i)||await e.put("meta",pc,pt.appMetaKey);return}const r={schemaVersion:pt.schemaVersion,id:pt.legacyWorldId,worldId:pt.legacyWorldId,name:"Imported World",seed:s.seed,previewImageDataUrl:null,createdAt:s.createdAt,updatedAt:s.createdAt,lastPlayedAt:s.createdAt,player:s.player,inventory:s.inventory,worldStats:s.worldStats},a=e.transaction(["worlds","chunkDiffs","meta"],"readwrite");await a.objectStore("worlds").put(r,r.id);const o=a.objectStore("chunkDiffs"),l=await o.getAllKeys(),c=await o.getAll();for(let d=0;d<c.length;d+=1){const h=c[d],u=l[d];if(!md(h)||ia(h))continue;const p=this.getChunkRecordKey(r.id,h.chunkKey);await o.put({id:p,worldId:r.id,chunkKey:h.chunkKey,revision:h.revision,changes:h.changes},p),typeof u=="string"&&u!==p&&await o.delete(u)}await a.objectStore("meta").put({schemaVersion:1,activeWorldId:r.id,lastWorldId:r.id},pt.appMetaKey),await a.objectStore("meta").delete(pt.legacyWorldId),await a.done}async createUniqueWorldId(e){const t=await this.getDb(),i=X_(e)||"world";let s=i,r=1;for(;await t.get("worlds",s);)r+=1,s=`${i}-${r}`;return s}async getPreferredWorldId(e){const t=await this.loadAppMeta(e);if(t.activeWorldId)return t.activeWorldId;if(t.lastWorldId)return t.lastWorldId;const i=(await e.getAll("worlds")).filter(yn).map(s=>Jn(s));return zs(i)[0]?.id??null}async loadAppMeta(e){const t=await e.get("meta",pt.appMetaKey);return sa(t)?t:pc}getChunkRecordKey(e,t){return`${e}:${t}`}}const q_=(n,e)=>{let t;return(...i)=>{t!==void 0&&window.clearTimeout(t),t=window.setTimeout(()=>{t=void 0,n(...i)},e)}};class K_{root=document.createElement("div");panel=document.createElement("div");visible=!1;constructor(e){this.root.className="debug-layer",this.panel.className="debug-panel",this.root.append(this.panel),e.append(this.root),this.setVisible(!1)}toggle(){this.setVisible(!this.visible)}setVisible(e){this.visible=e,this.root.style.display=e?"":"none"}update(e){this.panel.textContent=e}}class j_{root=document.createElement("div");crosshair=document.createElement("div");generationLabel=document.createElement("div");fpsLabel=document.createElement("div");healthFill=document.createElement("div");healthLabel=document.createElement("div");levelFill=document.createElement("div");levelLabel=document.createElement("div");hotbar=document.createElement("div");slotElements=[];language=zn;constructor(e){this.root.className="hud-layer",this.crosshair.className="crosshair",this.generationLabel.className="generation-label",this.generationLabel.textContent=Ft("hud.generating",{},this.language),this.generationLabel.style.display="none",this.fpsLabel.className="fps-label",this.fpsLabel.textContent="FPS 0";const t=document.createElement("div");t.className="status-bars";const i=document.createElement("div");i.className="status-bar health",this.healthFill.className="status-fill",this.healthLabel.className="status-label",this.healthLabel.textContent="HP 20/20",i.append(this.healthFill,this.healthLabel);const s=document.createElement("div");s.className="status-bar level",this.levelFill.className="status-fill",this.levelLabel.className="status-label",this.levelLabel.textContent="LVL 1",s.append(this.levelFill,this.levelLabel),t.append(i,s),this.hotbar.className="hotbar";for(let r=0;r<9;r+=1){const a=document.createElement("div");a.className="hotbar-slot";const o=document.createElement("div");o.className="slot-preview";const l=document.createElement("div");l.className="slot-count",l.style.display="none",a.append(o,l),this.hotbar.append(a),this.slotElements.push(a)}this.root.append(this.crosshair,this.generationLabel,this.fpsLabel,t,this.hotbar),e.append(this.root),this.setHealth(20,20),this.setLevel(1,0)}setVisible(e){this.root.style.display=e?"":"none"}setLanguage(e){this.language=e,this.generationLabel.textContent=Ft("hud.generating",{},this.language)}setTargetLabel(e){}setGenerating(e){this.generationLabel.style.display=e?"":"none"}setFps(e){this.fpsLabel.textContent=`FPS ${e}`}setMiningProgress(e){if(e<=0){this.crosshair.classList.remove("mining");return}this.crosshair.classList.add("mining")}setHealth(e,t){const i=Math.max(1,t),s=Math.max(0,Math.min(1,e/i));this.healthFill.style.width=`${s*100}%`,this.healthLabel.textContent=`HP ${Math.round(e)}/${i}`}setLevel(e,t){const i=Math.max(0,Math.min(1,t));this.levelFill.style.width=`${i*100}%`,this.levelLabel.textContent=`LVL ${Math.max(1,Math.floor(e))}`}setHandSkin(e){}updateHand(e,t,i){}updateHotbar(e,t){e.forEach((i,s)=>{const r=this.slotElements[s],a=r.children[0],o=r.children[1];r.classList.toggle("selected",s===t),a.style.background=Ii(i.blockId),i.count>0?(o.textContent=String(i.count),o.style.display=""):o.style.display="none"})}}const dt={modelRotationY:-.46,modelPositionY:0,head:{x:.02,y:0,z:0},body:{x:0,y:0,z:0},leftArm:{x:-.14,y:0,z:-.06},rightArm:{x:-.14,y:0,z:.06},leftLeg:{x:.04,y:0,z:0},rightLeg:{x:-.04,y:0,z:0}},ko=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),$_=ko?.9:1,Z_=ko?.95:1,J_=1/20,Q_=ko?24:30,eA=1e3/Q_;class Qi{constructor(e,t=null,i={}){this.container=e,this.animated=i.animated??!0,this.animationMode=i.animationMode??"spin",this.pixelRatioCap=this.animated?$_:Z_,this.showcaseTimeline=this.buildShowcaseTimeline(),this.showcaseCycleDuration=this.showcaseTimeline.reduce((a,o)=>a+o.duration,0),this.renderer=new Lo({antialias:!1,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.pixelRatioCap)),this.renderer.setClearColor(new Ue("#000000"),0),this.renderer.domElement.className="paperdoll-canvas",this.renderer.domElement.addEventListener("webglcontextlost",this.handleContextLost,!1),this.renderer.domElement.addEventListener("webglcontextrestored",this.handleContextRestored,!1),this.container.append(this.renderer.domElement),this.camera.position.set(0,1.02,3.9),this.scene.add(new Po("#dbe9ff",.6));const s=new nr("#ffe9bd",1.1);s.position.set(3.2,4,2.4),this.scene.add(s);const r=new nr("#8ab8ff",.38);r.position.set(-3,2.2,-1.8),this.scene.add(r),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.startAnimationLoop(),this.setSkin(t)}scene=new tr;camera=new It(42,1,.1,20);renderer;clock=new td;resizeObserver;animated;animationMode;pixelRatioCap;showcaseTimeline;showcaseCycleDuration;showcaseBlendDuration=.65;model=null;rig=null;rafId=0;skinRequestId=0;elapsedSeconds=0;active=!0;contextLost=!1;lastAnimatedRenderAt=0;disposed=!1;setActive(e){if(!(this.disposed||this.active===e)){if(this.active=e,this.animated){this.active?this.startAnimationLoop():this.stopAnimationLoop();return}this.active&&this.renderFrame()}}async setSkin(e){const t=++this.skinRequestId;let i;if(!e)i=await Li(null);else try{i=await Li(e)}catch{i=await Li(null)}if(this.disposed||t!==this.skinRequestId){i.texture.dispose();return}this.model&&(this.scene.remove(this.model),to(this.model),this.model=null),this.model=y_(i.texture,i.model),this.rig=this.captureRig(this.model),this.applyPose(this.elapsedSeconds),this.scene.add(this.model),!this.animated&&this.active&&this.renderFrame()}dispose(){this.disposed=!0,this.contextLost=!0,this.resizeObserver.disconnect(),this.stopAnimationLoop(),this.renderer.domElement.removeEventListener("webglcontextlost",this.handleContextLost),this.renderer.domElement.removeEventListener("webglcontextrestored",this.handleContextRestored),this.model&&(this.scene.remove(this.model),to(this.model),this.model=null),this.rig=null,this.renderer.dispose(),this.renderer.domElement.remove()}resize(){if(this.disposed||this.contextLost)return;const e=Math.max(20,this.container.clientWidth),t=Math.max(20,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.pixelRatioCap)),this.renderer.setSize(e,t,!1),!this.animated&&this.active&&this.renderFrame()}renderFrame(){this.disposed||this.contextLost||!this.active||this.renderer.render(this.scene,this.camera)}startAnimationLoop(){!this.animated||!this.active||this.disposed||this.contextLost||this.rafId!==0||(this.lastAnimatedRenderAt=0,this.clock.start(),this.clock.getDelta(),this.rafId=requestAnimationFrame(this.animate))}stopAnimationLoop(){this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0),this.clock.stop()}handleContextLost=e=>{e.preventDefault(),!this.disposed&&(this.contextLost=!0,this.stopAnimationLoop())};handleContextRestored=()=>{this.disposed||(this.contextLost=!1,this.resize(),this.animated?this.startAnimationLoop():this.renderFrame())};captureRig(e){e.updateMatrixWorld(!0);const t=e.children.filter(d=>d instanceof Wt),i=d=>({node:d,basePosition:d.position.clone()}),s=d=>{const h=d.parent;if(!h)return i(d);const u=new Gi().setFromObject(d);if(!Number.isFinite(u.min.y)||!Number.isFinite(u.max.y))return i(d);const p=u.max.y-d.position.y,g=new Wt;return g.position.set(d.position.x,d.position.y+p,d.position.z),h.add(g),g.add(d),d.position.set(0,-p,0),{node:g,basePosition:g.position.clone()}},r=d=>{const h=t[d];return h?i(h):null},a=t[2]??null,o=t[3]??null,l=t[4]??null,c=t[5]??null;return{head:r(0),body:r(1),leftArm:a?s(a):null,rightArm:o?s(o):null,leftLeg:l?s(l):null,rightLeg:c?s(c):null}}resetPose(){if(!this.model||(this.model.rotation.set(0,0,0),this.model.position.y=0,!this.rig))return;const e=t=>{t&&(t.node.rotation.set(0,0,0),t.node.position.copy(t.basePosition))};e(this.rig.head),e(this.rig.body),e(this.rig.leftArm),e(this.rig.rightArm),e(this.rig.leftLeg),e(this.rig.rightLeg)}applyPose(e){if(this.model)switch(this.resetPose(),this.animationMode){case"idle":this.applyIdlePose(e);break;case"showcase":this.applyShowcasePose(e);break;default:this.applySpinPose(e);break}}applySpinPose(e){this.model&&(this.model.rotation.y=-.6+e*.55,this.model.position.y=Math.sin(e*1.8)*.03)}applyIdlePose(e){if(!this.model)return;const t=Math.sin(e*.75),i=Math.sin(e*2.1);this.model.rotation.y=-.46+t*.14,this.model.position.y=i*.02,this.setPartRotation(this.rig?.head,Math.sin(e*.9)*.04,t*.2,0),this.setPartRotation(this.rig?.leftArm,-.08+Math.sin(e*1.2+Math.PI)*.08,0,-.03),this.setPartRotation(this.rig?.rightArm,-.08+Math.sin(e*1.2)*.08,0,.03),this.setPartRotation(this.rig?.leftLeg,Math.sin(e*1.2)*.04,0,0),this.setPartRotation(this.rig?.rightLeg,Math.sin(e*1.2+Math.PI)*.04,0,0)}applyShowcasePose(e){if(!this.model||this.showcaseTimeline.length===0||this.showcaseCycleDuration<=0)return;const t=(e%this.showcaseCycleDuration+this.showcaseCycleDuration)%this.showcaseCycleDuration;let i=0,s=this.showcaseTimeline.length-1;for(let d=0;d<this.showcaseTimeline.length;d+=1){const h=this.showcaseTimeline[d];if(t<i+h.duration){s=d;break}i+=h.duration}const r=this.showcaseTimeline[s],a=t-i,o=r.duration>0?this.clamp01(a/r.duration):0;let l=r.sample(a,o);const c=Math.min(this.showcaseBlendDuration,r.duration*.45);if(c>0&&a>=r.duration-c){const d=this.showcaseTimeline[(s+1)%this.showcaseTimeline.length],h=this.smooth((a-(r.duration-c))/c),g=d.sample(0,0);l=this.blendPose(l,g,h)}this.applyShowcasePoseState(l)}buildShowcaseTimeline(){return[{duration:6.4,sample:(e,t)=>this.sampleShowcaseSurvey(e,t)},{duration:5.8,sample:(e,t)=>this.sampleShowcaseWave(e,t)},{duration:6.6,sample:(e,t)=>this.sampleShowcaseRun(e,t)},{duration:6.2,sample:(e,t)=>this.sampleShowcaseCrouch(e,t)},{duration:6.8,sample:(e,t)=>this.sampleShowcaseTurn(e,t)},{duration:7.4,sample:(e,t)=>this.sampleShowcaseGroove(e,t)}]}sampleShowcaseSurvey(e,t){const i=Math.sin(t*Math.PI),s=Math.sin(e*1.08),r=Math.sin(e*2.02);return this.createShowcasePose({modelRotationY:dt.modelRotationY+s*.24*i,modelPositionY:r*.022,head:{x:dt.head.x+r*.048,y:s*.62*i},leftArm:{x:dt.leftArm.x+Math.sin(e*1.35+Math.PI)*.1*i,z:-.1},rightArm:{x:dt.rightArm.x+Math.sin(e*1.35)*.1*i,z:.1},leftLeg:{x:Math.sin(e*1.35)*.06*i},rightLeg:{x:Math.sin(e*1.35+Math.PI)*.06*i}})}sampleShowcaseWave(e,t){const i=Math.sin(t*Math.PI),s=Math.sin(e*7.4),r=Math.sin(e*2.1);return this.createShowcasePose({modelRotationY:dt.modelRotationY+i*.28,modelPositionY:Math.sin(e*4.3)*.018*i,body:{z:.08*i},head:{x:-.06*i,y:.28*i+r*.18*i},leftArm:{x:dt.leftArm.x+.12*i+Math.sin(e*1.8+Math.PI)*.08*i,z:-.14},rightArm:{x:dt.rightArm.x-1.05*i+s*.2*i,y:-.08*i,z:.16+.48*i+s*.14*i},leftLeg:{x:Math.sin(e*1.8+Math.PI)*.05*i},rightLeg:{x:Math.sin(e*1.8)*.05*i}})}sampleShowcaseRun(e,t){const i=Math.sin(t*Math.PI),s=Math.sin(e*7.2),r=Math.abs(Math.sin(e*7.2)),a=s*1.02*i,o=s*.88*i,l=.24+Math.abs(s)*.08;return this.createShowcasePose({modelRotationY:dt.modelRotationY+Math.sin(e*3.6)*.07*i,modelPositionY:r*.055*i,body:{x:r*.06*i},head:{x:-.03*i,y:Math.sin(e*2.4)*.14*i},leftArm:{x:dt.leftArm.x+a,y:.1*i,z:-l},rightArm:{x:dt.rightArm.x-a,y:-.1*i,z:l},leftLeg:{x:-o},rightLeg:{x:o}})}sampleShowcaseCrouch(e,t){const i=Math.sin(t*Math.PI),s=Math.sin(e*2.8)*.006*i,r=.08*i+s;return this.createShowcasePose({modelRotationY:dt.modelRotationY,modelPositionY:-r,body:{x:.34*i,z:0},head:{x:-.1*i,y:0},leftArm:{x:.22*i,z:-.1},rightArm:{x:.22*i,z:.1},leftLeg:{x:0,y:0,z:0},rightLeg:{x:0,y:0,z:0}})}sampleShowcaseTurn(e,t){const i=Math.sin(t*Math.PI),s=Math.sin(e*2.2);return this.createShowcasePose({modelRotationY:dt.modelRotationY+i*Math.PI*.95+s*.07*(1-i),modelPositionY:Math.sin(e*3.2)*.016*i,head:{y:-.5*i+s*.24*i},leftArm:{x:-.2+i*.12,z:-.12},rightArm:{x:-.2+i*.12,z:.12},leftLeg:{x:Math.sin(e*1.85)*.08*i},rightLeg:{x:Math.sin(e*1.85+Math.PI)*.08*i}})}sampleShowcaseGroove(e,t){const i=Math.sin(t*Math.PI),s=e*4.2,r=Math.sin(s),a=Math.sin(s+Math.PI/2),o=Math.sin(e*1.6);return this.createShowcasePose({modelRotationY:dt.modelRotationY+o*.22*i,modelPositionY:.012*i+Math.max(0,r)*.045*i,body:{z:r*.1*i},head:{x:a*.08*i,y:o*.32*i},leftArm:{x:.06+Math.sin(s+Math.PI*.4)*.5*i,z:-.22-r*.1*i},rightArm:{x:.06+Math.sin(s+Math.PI*1.4)*.5*i,z:.22+r*.1*i},leftLeg:{x:Math.sin(s+Math.PI)*.32*i},rightLeg:{x:Math.sin(s)*.32*i}})}createShowcasePose(e){return{modelRotationY:e.modelRotationY??dt.modelRotationY,modelPositionY:e.modelPositionY??dt.modelPositionY,head:this.mergeShowcasePart(dt.head,e.head),body:this.mergeShowcasePart(dt.body,e.body),leftArm:this.mergeShowcasePart(dt.leftArm,e.leftArm),rightArm:this.mergeShowcasePart(dt.rightArm,e.rightArm),leftLeg:this.mergeShowcasePart(dt.leftLeg,e.leftLeg),rightLeg:this.mergeShowcasePart(dt.rightLeg,e.rightLeg)}}mergeShowcasePart(e,t){return{x:t?.x??e.x,y:t?.y??e.y,z:t?.z??e.z}}blendShowcasePart(e,t,i){return{x:this.lerp(e.x,t.x,i),y:this.lerp(e.y,t.y,i),z:this.lerp(e.z,t.z,i)}}blendPose(e,t,i){return{modelRotationY:this.lerp(e.modelRotationY,t.modelRotationY,i),modelPositionY:this.lerp(e.modelPositionY,t.modelPositionY,i),head:this.blendShowcasePart(e.head,t.head,i),body:this.blendShowcasePart(e.body,t.body,i),leftArm:this.blendShowcasePart(e.leftArm,t.leftArm,i),rightArm:this.blendShowcasePart(e.rightArm,t.rightArm,i),leftLeg:this.blendShowcasePart(e.leftLeg,t.leftLeg,i),rightLeg:this.blendShowcasePart(e.rightLeg,t.rightLeg,i)}}applyShowcasePoseState(e){this.model&&(this.model.rotation.y=e.modelRotationY,this.model.position.y=e.modelPositionY,this.setPartRotation(this.rig?.head,e.head.x,e.head.y,e.head.z),this.setPartRotation(this.rig?.body,e.body.x,e.body.y,e.body.z),this.setPartRotation(this.rig?.leftArm,e.leftArm.x,e.leftArm.y,e.leftArm.z),this.setPartRotation(this.rig?.rightArm,e.rightArm.x,e.rightArm.y,e.rightArm.z),this.setPartRotation(this.rig?.leftLeg,e.leftLeg.x,e.leftLeg.y,e.leftLeg.z),this.setPartRotation(this.rig?.rightLeg,e.rightLeg.x,e.rightLeg.y,e.rightLeg.z))}setPartRotation(e,t,i=0,s=0){e&&(e.node.rotation.set(t,i,s),e.node.position.copy(e.basePosition))}clamp01(e){return Math.max(0,Math.min(1,e))}smooth(e){const t=this.clamp01(e);return t*t*(3-2*t)}lerp(e,t,i){return e+(t-e)*i}animate=e=>{if(this.disposed||!this.animated||!this.active||this.contextLost){this.rafId=0;return}this.rafId=requestAnimationFrame(this.animate),!(this.lastAnimatedRenderAt!==0&&e-this.lastAnimatedRenderAt<eA)&&(this.lastAnimatedRenderAt=e,this.elapsedSeconds+=Math.min(this.clock.getDelta(),J_),this.applyPose(this.elapsedSeconds),this.renderFrame())}}class tA{constructor(e,t){this.handlers=t,this.root.className="inventory-layer",this.root.addEventListener("mousemove",f=>{this.pointerX=f.clientX,this.pointerY=f.clientY,this.positionHoverLabel()});const i=document.createElement("div");i.className="inventory-panel";const s=document.createElement("div");s.className="inventory-rail",s.append(this.createFilterButton("craftable"),this.createFilterButton("all"));const r=document.createElement("div");r.className="inventory-sidebar",this.title.className="inventory-title",this.status.className="inventory-status",this.recipeList.className="recipe-list";const a=document.createElement("div");a.className="inventory-workspace";const o=document.createElement("div");o.className="inventory-board";const l=document.createElement("div");l.className="inventory-board-header",this.boardTitle.className="inventory-section-title",this.boardHint.textContent="",l.append(this.boardTitle,this.boardHint);const c=document.createElement("section");c.className="inventory-section",this.mainGrid.className="inventory-grid inventory-grid-main";const d=document.createElement("section");d.className="inventory-section inventory-hotbar-section",this.hotbarTitle.className="inventory-section-title",this.hotbarGrid.className="inventory-grid inventory-grid-hotbar";for(let f=0;f<36;f+=1){const M=document.createElement("button");M.type="button",M.className=`inventory-slot${f>=27?" hotbar":""}`,M.addEventListener("click",C=>{this.handlers.onSlotInteract({index:f,button:"left",shift:C.shiftKey})}),M.addEventListener("contextmenu",C=>{C.preventDefault(),this.handlers.onSlotInteract({index:f,button:"right",shift:C.shiftKey})}),M.addEventListener("mouseenter",()=>{this.hoveredSlotIndex=f,this.renderHoverLabel()}),M.addEventListener("mouseleave",()=>{this.hoveredSlotIndex=null,this.renderHoverLabel()});const w=document.createElement("div");w.className="inventory-slot-preview";const b=document.createElement("div");b.className="inventory-slot-count",M.append(w,b),f<27?this.mainGrid.append(M):this.hotbarGrid.append(M),this.slotButtons.push(M)}c.append(this.mainGrid),d.append(this.hotbarTitle,this.hotbarGrid),this.cursorLabel.className="inventory-cursor",this.hoverLabel.className="inventory-hover",o.append(l,c,d,this.cursorLabel);const h=document.createElement("div");h.className="inventory-preview";const u=document.createElement("div");u.className="inventory-side-card",this.paperdollTitle.className="inventory-section-title";const p=document.createElement("div");p.className="paperdoll",this.paperdollScale.className="paperdoll-scale";const g=document.createElement("div");g.className="paperdoll-stage",p.append(this.paperdollScale,g),this.skinViewer=new Qi(g),this.skinLoader.className="skin-loader",this.skinInput.type="file",this.skinInput.accept="image/png",this.skinInput.addEventListener("change",()=>{const f=this.skinInput.files?.[0];if(!f)return;const M=new FileReader;M.onload=()=>{typeof M.result=="string"&&(this.loadedSkinDataUrl=M.result,this.skinViewer.setSkin(M.result),this.handlers.onSkinChange(M.result))},M.readAsDataURL(f),this.skinInput.value=""}),this.skinLoader.append(this.skinInput),u.append(this.paperdollTitle,p,this.skinLoader);const v=document.createElement("div");v.className="inventory-side-card",this.equipmentTitle.className="inventory-section-title",this.equipmentNote.className="inventory-side-note";const m=document.createElement("div");m.className="equipment-slot-column";for(let f=0;f<4;f+=1){const M=document.createElement("div");M.className="equipment-slot",M.textContent="",this.equipmentSlots.push(M),m.append(M)}v.append(this.equipmentTitle,this.equipmentNote,m),this.closeButton.type="button",this.closeButton.className="inventory-close",this.closeButton.addEventListener("click",()=>this.handlers.onClose()),r.append(this.title,this.status,this.recipeList),a.append(o,this.closeButton),h.append(u,v),i.append(s,r,a,h,this.hoverLabel),this.root.append(i),e.append(this.root),this.applyLanguage(),this.setVisible(!1)}root=document.createElement("div");title=document.createElement("h2");status=document.createElement("div");recipeList=document.createElement("div");mainGrid=document.createElement("div");hotbarGrid=document.createElement("div");boardTitle=document.createElement("h3");boardHint=document.createElement("span");hotbarTitle=document.createElement("h3");paperdollTitle=document.createElement("h3");paperdollScale=document.createElement("div");skinLoader=document.createElement("label");equipmentTitle=document.createElement("h3");equipmentNote=document.createElement("p");closeButton=document.createElement("button");cursorLabel=document.createElement("div");hoverLabel=document.createElement("div");skinInput=document.createElement("input");slotButtons=[];equipmentSlots=[];filterButtons=new Map;skinViewer;visible=!1;loadedSkinDataUrl=null;hoveredSlotIndex=null;pointerX=0;pointerY=0;latestState=null;recipeFilter="craftable";language=zn;setVisible(e){this.visible=e,this.root.style.display=e?"grid":"none",this.skinViewer.setActive(e),e||(this.hoveredSlotIndex=null,this.renderHoverLabel())}isVisible(){return this.visible}setLanguage(e){this.language!==e&&(this.language=e,this.applyLanguage(),this.latestState&&this.render(this.latestState))}t(e){return Ft(`inventory.${e}`,{},this.language)}tf(e,t){return Ft(`inventory.${e}`,t,this.language)}applyLanguage(){this.boardTitle.textContent=this.t("storage"),this.boardHint.textContent=this.t("boardHint"),this.hotbarTitle.textContent=this.t("hotbar"),this.paperdollTitle.textContent=this.t("character"),this.paperdollScale.textContent=this.t("paperdoll"),this.skinLoader.replaceChildren(document.createTextNode(this.t("loadSkin")),this.skinInput),this.equipmentTitle.textContent=this.t("equipment"),this.equipmentNote.textContent=this.t("equipmentNote"),this.equipmentSlots.forEach(i=>{i.textContent=this.t("soon")}),this.closeButton.textContent=this.t("close");const e=this.filterButtons.get("craftable");e&&(e.textContent=this.t("filterCraftable"));const t=this.filterButtons.get("all");t&&(t.textContent=this.t("filterAll"))}dispose(){this.skinViewer.dispose()}render(e){this.latestState=e,this.title.textContent=e.mode==="crafting_table"?this.t("craftingTable"):this.t("inventory");const t=this.recipeFilter==="craftable"?e.recipes.filter(s=>e.craftableRecipeIds.has(s.id)):e.recipes,i=e.recipes.filter(s=>e.craftableRecipeIds.has(s.id)).length;if(this.status.textContent=e.mode==="crafting_table"?this.tf("craftableOnTable",{count:String(i)}):this.tf("craftableInInventory",{count:String(i)}),this.filterButtons.forEach((s,r)=>{s.classList.toggle("active",r===this.recipeFilter)}),this.loadedSkinDataUrl!==e.skinDataUrl&&(this.loadedSkinDataUrl=e.skinDataUrl,this.skinViewer.setSkin(e.skinDataUrl)),this.recipeList.replaceChildren(),t.length===0){const s=document.createElement("div");s.className="recipe-empty",s.textContent=this.recipeFilter==="craftable"?this.t("emptyCraftable"):this.t("emptyRecipes"),this.recipeList.append(s)}else t.forEach(s=>{const r=e.craftableRecipeIds.has(s.id),a=document.createElement("button");a.type="button",a.className="recipe-card",a.disabled=!r,a.addEventListener("click",()=>this.handlers.onRecipeCraft(s.id));const o=document.createElement("div");o.className="recipe-icon",o.style.background=Ii(s.output.blockId);const l=document.createElement("div");l.className="recipe-card-body";const c=document.createElement("strong");c.textContent=s.label;const d=document.createElement("span");d.textContent=s.description;const h=document.createElement("div");h.className="recipe-ingredients",s.ingredients.forEach(u=>{const p=document.createElement("div");p.className="recipe-chip",p.innerHTML=`<b style="background:${Ii(u.blockId)}"></b>${u.count} x ${Os(u.blockId,this.language)}`,h.append(p)}),l.append(c,d,h),a.append(o,l),this.recipeList.append(a)});e.slots.forEach((s,r)=>{const a=this.slotButtons[r],o=a.children[0],l=a.children[1],c=r-27;a.classList.toggle("selected",c===e.selectedHotbarIndex&&c>=0),a.classList.toggle("filled",s.blockId!==null&&s.count>0),o.style.background=Ii(s.blockId),o.textContent=s.blockId===null?"":Os(s.blockId,this.language).slice(0,1).toUpperCase(),l.textContent=s.count>0?String(s.count):"",l.style.display=s.count>0?"":"none"}),e.cursor.blockId===null||e.cursor.count===0?this.cursorLabel.textContent=this.t("cursorEmpty"):this.cursorLabel.textContent=this.tf("cursorValue",{count:String(e.cursor.count),name:Os(e.cursor.blockId,this.language)}),this.renderHoverLabel()}createFilterButton(e){const t=document.createElement("button");return t.type="button",t.className="inventory-filter-button",t.addEventListener("click",()=>{this.recipeFilter=e,this.latestState&&this.render(this.latestState)}),this.filterButtons.set(e,t),t}renderHoverLabel(){if(!this.latestState||this.hoveredSlotIndex===null){this.hoverLabel.style.visibility="hidden",this.hoverLabel.textContent="";return}const e=this.latestState.slots[this.hoveredSlotIndex];if(!e||e.blockId===null||e.count<=0){this.hoverLabel.style.visibility="hidden",this.hoverLabel.textContent="";return}this.hoverLabel.style.visibility="visible",this.hoverLabel.textContent=`${Os(e.blockId,this.language)} x${e.count}`,this.positionHoverLabel()}positionHoverLabel(){if(this.hoverLabel.style.visibility!=="visible")return;const e=14,t=18;this.hoverLabel.style.left=`${this.pointerX+e}px`,this.hoverLabel.style.top=`${this.pointerY+t}px`}}const nA="modulepreload",iA=function(n){return"/"+n},mc={},A=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let l=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=l(t.map(c=>{if(c=iA(c),c in mc)return;mc[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":nA,d||(u.as="script"),u.crossOrigin="",u.href=c,o&&u.setAttribute("nonce",o),document.head.appendChild(u),d)return new Promise((p,g)=>{u.addEventListener("load",p),u.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},gd=Object.assign({"../../assets/skins/boys animal/andrew.png":()=>A(()=>import("./andrew-DOM1p16T.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/eric.png":()=>A(()=>import("./eric-ZUe9kemE.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/finn.png":()=>A(()=>import("./finn-ueDjl5TD.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/gabriel.png":()=>A(()=>import("./gabriel-BFMukKwP.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/jacob.png":()=>A(()=>import("./jacob-CMJIVYCP.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/liam.png":()=>A(()=>import("./liam-DmPP6mjn.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/lucas.png":()=>A(()=>import("./lucas-BGwLULd5.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/oscar.png":()=>A(()=>import("./oscar-CoMFwbFE.js"),[]).then(n=>n.default),"../../assets/skins/boys animal/zane.png":()=>A(()=>import("./zane-QJoawlM1.js"),[]).then(n=>n.default),"../../assets/skins/boys christmas/aiden.png":()=>A(()=>import("./aiden-B4cTGcWt.js"),[]).then(n=>n.default),"../../assets/skins/boys christmas/amir.png":()=>A(()=>import("./amir-DtwA0G98.js"),[]).then(n=>n.default),"../../assets/skins/boys christmas/axel.png":()=>A(()=>import("./axel-lipJhWjx.js"),[]).then(n=>n.default),"../../assets/skins/boys christmas/baptiste.png":()=>A(()=>import("./baptiste-t4g9TMih.js"),[]).then(n=>n.default),"../../assets/skins/boys christmas/gabriel.png":()=>A(()=>import("./gabriel-w286JgLp.js"),[]).then(n=>n.default),"../../assets/skins/boys christmas/matthew.png":()=>A(()=>import("./matthew-GdHNkOS9.js"),[]).then(n=>n.default),"../../assets/skins/boys christmas/teddy.png":()=>A(()=>import("./teddy-B6rGC2MI.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/andrew.png":()=>A(()=>import("./andrew-BuK1Mddt.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/aymeric.png":()=>A(()=>import("./aymeric-CCozJVOW.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/dylan.png":()=>A(()=>import("./dylan-CGKorbhA.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/felix.png":()=>A(()=>import("./felix-SH10ZmuX.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/gavin.png":()=>A(()=>import("./gavin-BucLOVfo.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/grant.png":()=>A(()=>import("./grant-YAZ4S1Ni.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/gregory.png":()=>A(()=>import("./gregory-C6BAp9BK.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/henry.png":()=>A(()=>import("./henry-Cynmv88J.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/jonah.png":()=>A(()=>import("./jonah-QjS9suPu.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/landon.png":()=>A(()=>import("./landon-DlFvPxo9.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/leon.png":()=>A(()=>import("./leon-GyFyiSyJ.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/louis.png":()=>A(()=>import("./louis-CiKH81Ig.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/lucas.png":()=>A(()=>import("./lucas-RQl0Hgem.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/luke.png":()=>A(()=>import("./luke-C2Hai3-K.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/micah.png":()=>A(()=>import("./micah-CMmSYw2f.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/nathan.png":()=>A(()=>import("./nathan-C9BpauhN.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/noah.png":()=>A(()=>import("./noah-CKjejVbN.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/sebastian.png":()=>A(()=>import("./sebastian-O2T-2LOS.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/silas.png":()=>A(()=>import("./silas-BIVWbT__.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/simon.png":()=>A(()=>import("./simon-EM5c2ig8.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/spencer.png":()=>A(()=>import("./spencer-B3bygRnQ.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/thomas.png":()=>A(()=>import("./thomas-NTjPCoDS.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/timothy.png":()=>A(()=>import("./timothy-WwgFp_RO.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/vincent.png":()=>A(()=>import("./vincent-BmeIkUiV.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/william.png":()=>A(()=>import("./william-DyGSsJ-O.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/wyatt.png":()=>A(()=>import("./wyatt-SFTNTxUm.js"),[]).then(n=>n.default),"../../assets/skins/boys classic/zachary.png":()=>A(()=>import("./zachary-Cvtxj2xm.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/aaron.png":()=>A(()=>import("./aaron-B6Q7byT3.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/adam.png":()=>A(()=>import("./adam-VslhcSV6.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/adrian.png":()=>A(()=>import("./adrian-BelbRrgq.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/albert.png":()=>A(()=>import("./albert-BZ6SE2at.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/alec.png":()=>A(()=>import("./alec-C1qvungf.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/alexander.png":()=>A(()=>import("./alexander-D5hlLnhK.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/alfred.png":()=>A(()=>import("./alfred-BXZebfkt.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/anthony.png":()=>A(()=>import("./anthony-BkfC5t-s.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/arthur.png":()=>A(()=>import("./arthur-jCTROxRe.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/blake.png":()=>A(()=>import("./blake-BTHNIaAx.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/brian.png":()=>A(()=>import("./brian-9ZFfNWpo.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/carlos.png":()=>A(()=>import("./carlos-C9Tn_nqV.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/carter.png":()=>A(()=>import("./carter-D0Bd5fWG.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/charles.png":()=>A(()=>import("./charles-ZJHCLrji.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/christopher.png":()=>A(()=>import("./christopher-B-kq1K40.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/cole.png":()=>A(()=>import("./cole-BxfNvxU4.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/cooper.png":()=>A(()=>import("./cooper-BMDZnMT7.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/david.png":()=>A(()=>import("./david-BL3jJL83.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/dominic.png":()=>A(()=>import("./dominic-CcAX5nbD.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/dylan.png":()=>A(()=>import("./dylan-CFxGOGpe.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/edward.png":()=>A(()=>import("./edward-DjHZFC1o.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/elijah.png":()=>A(()=>import("./elijah-hQ7tjsy6.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/emmett.png":()=>A(()=>import("./emmett-BmOPcBo_.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/ethan.png":()=>A(()=>import("./ethan-IJWTeIyB.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/evan.png":()=>A(()=>import("./evan-CHfHz6GH.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/finn.png":()=>A(()=>import("./finn-olrpZdTW.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/gavin.png":()=>A(()=>import("./gavin-B_9ppibV.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/george.png":()=>A(()=>import("./george-D0s5fCD_.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/grayson.png":()=>A(()=>import("./grayson-Bm1hk4ut.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/harrison.png":()=>A(()=>import("./harrison-CZFIeJ0b.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/hunter.png":()=>A(()=>import("./hunter-CcEYm-4o.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/jasper.png":()=>A(()=>import("./jasper-Dm2CF8iO.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/jonathan.png":()=>A(()=>import("./jonathan-K98HC7LV.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/joshua.png":()=>A(()=>import("./joshua-fflSVOoX.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/julian.png":()=>A(()=>import("./julian-CrDPgJER.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/kai.png":()=>A(()=>import("./kai-BUgZ9ABw.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/kevin.png":()=>A(()=>import("./kevin-BJG_x9bx.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/kyle.png":()=>A(()=>import("./kyle-okKUIfQx.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/landon.png":()=>A(()=>import("./landon-LQdpoIR7.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/leo.png":()=>A(()=>import("./leo-BXhGey8e.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/leonardo.png":()=>A(()=>import("./leonardo-Cx4Sd_F5.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/levi.png":()=>A(()=>import("./levi-CgksAjJU.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/liam.png":()=>A(()=>import("./liam-BBtsWYBB.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/logan.png":()=>A(()=>import("./logan-DMuPAoE3.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/louis.png":()=>A(()=>import("./louis-DYcthrN3.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/malcolm.png":()=>A(()=>import("./malcolm-DaYTSoxR.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/max.png":()=>A(()=>import("./max-00npYONW.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/nolan.png":()=>A(()=>import("./nolan-l_8yzBoO.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/parker.png":()=>A(()=>import("./parker-DlySWGD-.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/paul.png":()=>A(()=>import("./paul-BuHqkcai.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/rafael.png":()=>A(()=>import("./rafael-CoCc-_Np.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/richard.png":()=>A(()=>import("./richard-Dogc_hky.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/roman.png":()=>A(()=>import("./roman-7RfNt4-1.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/samuel.png":()=>A(()=>import("./samuel-D8-sRdUI.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/sean.png":()=>A(()=>import("./sean-Bd5Jv_0W.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/sebastian.png":()=>A(()=>import("./sebastian-Du_iH0AJ.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/silas.png":()=>A(()=>import("./silas-CJHO1_QW.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/theo.png":()=>A(()=>import("./theo-CG19G9Ql.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/theodore.png":()=>A(()=>import("./theodore-Dov0jCe6.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/thomas.png":()=>A(()=>import("./thomas-Ad7SaYBh.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/victor.png":()=>A(()=>import("./victor-C6Nb3OlF.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/vincent.png":()=>A(()=>import("./vincent-DnE1fHor.js"),[]).then(n=>n.default),"../../assets/skins/boys crossover/xavier.png":()=>A(()=>import("./xavier-CBo9ib_T.js"),[]).then(n=>n.default),"../../assets/skins/boys default/colin.png":()=>A(()=>import("./colin-D_Q7v9RP.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/andre.png":()=>A(()=>import("./andre-CADJLa94.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/andrew.png":()=>A(()=>import("./andrew-Cq4jkIfp.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/charles.png":()=>A(()=>import("./charles-D0t9Wgui.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/cooper.png":()=>A(()=>import("./cooper-CDOUcpm6.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/john.png":()=>A(()=>import("./john-Bn0-2XhC.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/jonathan.png":()=>A(()=>import("./jonathan-P7J_PzWx.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/kai.png":()=>A(()=>import("./kai-BOApwltv.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/lucas.png":()=>A(()=>import("./lucas-awK-vxiK.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/malcolm.png":()=>A(()=>import("./malcolm-kj7Qc5zI.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/marcus.png":()=>A(()=>import("./marcus-Bb497pZa.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/noah.png":()=>A(()=>import("./noah-Dfdl_-kD.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/oscar.png":()=>A(()=>import("./oscar-BCQV0Vq1.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/robert.png":()=>A(()=>import("./robert-gVdT1qH5.js"),[]).then(n=>n.default),"../../assets/skins/boys disguise/zachary.png":()=>A(()=>import("./zachary-B6t7M_ln.js"),[]).then(n=>n.default),"../../assets/skins/boys food/albert.png":()=>A(()=>import("./albert-D7GyKSJN.js"),[]).then(n=>n.default),"../../assets/skins/boys food/alfred.png":()=>A(()=>import("./alfred-ocz5fmda.js"),[]).then(n=>n.default),"../../assets/skins/boys food/andre.png":()=>A(()=>import("./andre-BZZS5AVY.js"),[]).then(n=>n.default),"../../assets/skins/boys food/anthony.png":()=>A(()=>import("./anthony-CbbqIFbW.js"),[]).then(n=>n.default),"../../assets/skins/boys food/cameron.png":()=>A(()=>import("./cameron-CRNqLaMW.js"),[]).then(n=>n.default),"../../assets/skins/boys food/christian.png":()=>A(()=>import("./christian-DXv-nCAA.js"),[]).then(n=>n.default),"../../assets/skins/boys food/christopher.png":()=>A(()=>import("./christopher-qEQJkxES.js"),[]).then(n=>n.default),"../../assets/skins/boys food/david.png":()=>A(()=>import("./david-nkeFM5T7.js"),[]).then(n=>n.default),"../../assets/skins/boys food/gavin.png":()=>A(()=>import("./gavin-CJs8payI.js"),[]).then(n=>n.default),"../../assets/skins/boys food/hudson.png":()=>A(()=>import("./hudson-D2kJ6LUn.js"),[]).then(n=>n.default),"../../assets/skins/boys food/ivan.png":()=>A(()=>import("./ivan-CiLUs8g5.js"),[]).then(n=>n.default),"../../assets/skins/boys food/jason.png":()=>A(()=>import("./jason-B0xdZWjn.js"),[]).then(n=>n.default),"../../assets/skins/boys food/jordan.png":()=>A(()=>import("./jordan-CJfdQXSk.js"),[]).then(n=>n.default),"../../assets/skins/boys food/justin.png":()=>A(()=>import("./justin-PH9VgiEm.js"),[]).then(n=>n.default),"../../assets/skins/boys food/nolan.png":()=>A(()=>import("./nolan-CsdMEr0f.js"),[]).then(n=>n.default),"../../assets/skins/boys food/rafael.png":()=>A(()=>import("./rafael-Du3hMBDG.js"),[]).then(n=>n.default),"../../assets/skins/boys food/wesley.png":()=>A(()=>import("./wesley-gwvKxhPq.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/brandon.png":()=>A(()=>import("./brandon-BBtMbFEY.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/connor.png":()=>A(()=>import("./connor-9WPG_8pU.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/eden.png":()=>A(()=>import("./eden-BIcIPd9S.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/grant.png":()=>A(()=>import("./grant-CgLCTa0i.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/henry.png":()=>A(()=>import("./henry-DyU_JF4j.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/jonah.png":()=>A(()=>import("./jonah-DMx8OQtM.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/jordan.png":()=>A(()=>import("./jordan-CxtWDnIC.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/lucas.png":()=>A(()=>import("./lucas-mG-zXjvL.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/nolan.png":()=>A(()=>import("./nolan-xmhlDyLc.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/peter.png":()=>A(()=>import("./peter-DXaWteAb.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/roman.png":()=>A(()=>import("./roman-DeBAbQ45.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/spencer.png":()=>A(()=>import("./spencer-DrnBT8DP.js"),[]).then(n=>n.default),"../../assets/skins/boys funny/steven.png":()=>A(()=>import("./steven-EiDgI5zp.js"),[]).then(n=>n.default),"../../assets/skins/boys horror/cole.png":()=>A(()=>import("./cole-D7gy9nzY.js"),[]).then(n=>n.default),"../../assets/skins/boys horror/jacob.png":()=>A(()=>import("./jacob-DGHXJFJB.js"),[]).then(n=>n.default),"../../assets/skins/boys military/aaron.png":()=>A(()=>import("./aaron-Bf0z0WQQ.js"),[]).then(n=>n.default),"../../assets/skins/boys military/adrian.png":()=>A(()=>import("./adrian-DfUxF6Ns.js"),[]).then(n=>n.default),"../../assets/skins/boys military/aiden.png":()=>A(()=>import("./aiden-D4lvbDe5.js"),[]).then(n=>n.default),"../../assets/skins/boys military/alec.png":()=>A(()=>import("./alec-Ce41pbF2.js"),[]).then(n=>n.default),"../../assets/skins/boys military/alexander.png":()=>A(()=>import("./alexander-BePDRYuZ.js"),[]).then(n=>n.default),"../../assets/skins/boys military/amir.png":()=>A(()=>import("./amir-CJB4tScf.js"),[]).then(n=>n.default),"../../assets/skins/boys military/andre.png":()=>A(()=>import("./andre-Dc2wp3qS.js"),[]).then(n=>n.default),"../../assets/skins/boys military/anthony.png":()=>A(()=>import("./anthony-Bply0ecm.js"),[]).then(n=>n.default),"../../assets/skins/boys military/asher.png":()=>A(()=>import("./asher-_9a1Cn6d.js"),[]).then(n=>n.default),"../../assets/skins/boys military/benjamin.png":()=>A(()=>import("./benjamin-LB0V3zvh.js"),[]).then(n=>n.default),"../../assets/skins/boys military/blake.png":()=>A(()=>import("./blake-W3KKu_uq.js"),[]).then(n=>n.default),"../../assets/skins/boys military/brandon.png":()=>A(()=>import("./brandon-4si5-LTC.js"),[]).then(n=>n.default),"../../assets/skins/boys military/carlos.png":()=>A(()=>import("./carlos-BUVRUkDM.js"),[]).then(n=>n.default),"../../assets/skins/boys military/charles.png":()=>A(()=>import("./charles-kGcl6eQU.js"),[]).then(n=>n.default),"../../assets/skins/boys military/cole.png":()=>A(()=>import("./cole-CvC5lepq.js"),[]).then(n=>n.default),"../../assets/skins/boys military/damian.png":()=>A(()=>import("./damian-eFSpMcSF.js"),[]).then(n=>n.default),"../../assets/skins/boys military/eden.png":()=>A(()=>import("./eden-CRptrQ9N.js"),[]).then(n=>n.default),"../../assets/skins/boys military/elliot.png":()=>A(()=>import("./elliot-DH7i7puw.js"),[]).then(n=>n.default),"../../assets/skins/boys military/ethan.png":()=>A(()=>import("./ethan-Ct-XptHT.js"),[]).then(n=>n.default),"../../assets/skins/boys military/francis.png":()=>A(()=>import("./francis-z2H1dBly.js"),[]).then(n=>n.default),"../../assets/skins/boys military/gabriel.png":()=>A(()=>import("./gabriel-eCoq33Z9.js"),[]).then(n=>n.default),"../../assets/skins/boys military/gavin.png":()=>A(()=>import("./gavin-kDrpEot8.js"),[]).then(n=>n.default),"../../assets/skins/boys military/gregory.png":()=>A(()=>import("./gregory-CpZmYz4h.js"),[]).then(n=>n.default),"../../assets/skins/boys military/hudson.png":()=>A(()=>import("./hudson-DZnGTND1.js"),[]).then(n=>n.default),"../../assets/skins/boys military/ivan.png":()=>A(()=>import("./ivan-aWE3g9wY.js"),[]).then(n=>n.default),"../../assets/skins/boys military/jack.png":()=>A(()=>import("./jack-d_sTFSRq.js"),[]).then(n=>n.default),"../../assets/skins/boys military/jackson.png":()=>A(()=>import("./jackson-CCXcfjA-.js"),[]).then(n=>n.default),"../../assets/skins/boys military/jason.png":()=>A(()=>import("./jason-GNaM_Z3r.js"),[]).then(n=>n.default),"../../assets/skins/boys military/jeremy.png":()=>A(()=>import("./jeremy-DlYna-n5.js"),[]).then(n=>n.default),"../../assets/skins/boys military/joshua.png":()=>A(()=>import("./joshua-BrduJp2z.js"),[]).then(n=>n.default),"../../assets/skins/boys military/justin.png":()=>A(()=>import("./justin-CN4OdUNp.js"),[]).then(n=>n.default),"../../assets/skins/boys military/kevin.png":()=>A(()=>import("./kevin-CMDJfjNJ.js"),[]).then(n=>n.default),"../../assets/skins/boys military/kyle.png":()=>A(()=>import("./kyle-B8JHouDu.js"),[]).then(n=>n.default),"../../assets/skins/boys military/louis.png":()=>A(()=>import("./louis-CoyRrF6e.js"),[]).then(n=>n.default),"../../assets/skins/boys military/lucas.png":()=>A(()=>import("./lucas-aNT5aRjC.js"),[]).then(n=>n.default),"../../assets/skins/boys military/luke.png":()=>A(()=>import("./luke-2ooCvlWr.js"),[]).then(n=>n.default),"../../assets/skins/boys military/malcolm.png":()=>A(()=>import("./malcolm-Df_eHLjx.js"),[]).then(n=>n.default),"../../assets/skins/boys military/mark.png":()=>A(()=>import("./mark-eIqlKfzQ.js"),[]).then(n=>n.default),"../../assets/skins/boys military/max.png":()=>A(()=>import("./max-CXH4ckT_.js"),[]).then(n=>n.default),"../../assets/skins/boys military/nicholas.png":()=>A(()=>import("./nicholas-U9M4zefk.js"),[]).then(n=>n.default),"../../assets/skins/boys military/oliver.png":()=>A(()=>import("./oliver-B8-xqjKf.js"),[]).then(n=>n.default),"../../assets/skins/boys military/paul.png":()=>A(()=>import("./paul-DJRPFVF8.js"),[]).then(n=>n.default),"../../assets/skins/boys military/peter.png":()=>A(()=>import("./peter-C1Td4MD-.js"),[]).then(n=>n.default),"../../assets/skins/boys military/preston.png":()=>A(()=>import("./preston-Bwd_e0bl.js"),[]).then(n=>n.default),"../../assets/skins/boys military/richard.png":()=>A(()=>import("./richard-BJBpuUyj.js"),[]).then(n=>n.default),"../../assets/skins/boys military/roman.png":()=>A(()=>import("./roman-DrMUUy8w.js"),[]).then(n=>n.default),"../../assets/skins/boys military/scott.png":()=>A(()=>import("./scott-DS0QZXnR.js"),[]).then(n=>n.default),"../../assets/skins/boys military/sean.png":()=>A(()=>import("./sean-C0hO-XZQ.js"),[]).then(n=>n.default),"../../assets/skins/boys military/spencer.png":()=>A(()=>import("./spencer-bGDzZ4mG.js"),[]).then(n=>n.default),"../../assets/skins/boys military/thomas.png":()=>A(()=>import("./thomas-D040Swnf.js"),[]).then(n=>n.default),"../../assets/skins/boys military/trevor.png":()=>A(()=>import("./trevor-LYa3YoGE.js"),[]).then(n=>n.default),"../../assets/skins/boys military/tyler.png":()=>A(()=>import("./tyler-B326JEFV.js"),[]).then(n=>n.default),"../../assets/skins/boys military/victor.png":()=>A(()=>import("./victor-CEQQC5mH.js"),[]).then(n=>n.default),"../../assets/skins/boys military/walter.png":()=>A(()=>import("./walter-D6GShEWH.js"),[]).then(n=>n.default),"../../assets/skins/boys military/wesley.png":()=>A(()=>import("./wesley-B_pr2bfu.js"),[]).then(n=>n.default),"../../assets/skins/boys military/william.png":()=>A(()=>import("./william-DH7i7puw.js"),[]).then(n=>n.default),"../../assets/skins/boys military/wyatt.png":()=>A(()=>import("./wyatt-BJW5RPdp.js"),[]).then(n=>n.default),"../../assets/skins/boys military/xavier.png":()=>A(()=>import("./xavier-C7OUdd4W.js"),[]).then(n=>n.default),"../../assets/skins/boys military/zachary.png":()=>A(()=>import("./zachary-CJbuMzt3.js"),[]).then(n=>n.default),"../../assets/skins/boys military/zane.png":()=>A(()=>import("./zane-Ce41pbF2.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/alfred.png":()=>A(()=>import("./alfred-U3rukuCf.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/anthony.png":()=>A(()=>import("./anthony-CVtHdQNP.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/cameron.png":()=>A(()=>import("./cameron-DQ3r-Y06.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/damian.png":()=>A(()=>import("./damian-BDsXp-yL.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/daniel.png":()=>A(()=>import("./daniel-CLCldKdB.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/elijah.png":()=>A(()=>import("./elijah-COnetOJC.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/gregory.png":()=>A(()=>import("./gregory-D7bYI--Z.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/harrison.png":()=>A(()=>import("./harrison-_9Jksp3J.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/john.png":()=>A(()=>import("./john-Dxk18YmY.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/jonah.png":()=>A(()=>import("./jonah-BO15C2Bo.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/kai.png":()=>A(()=>import("./kai-B4cXXm-Z.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/kyle.png":()=>A(()=>import("./kyle-DGrXxhub.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/louis.png":()=>A(()=>import("./louis-DtJd9aHu.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/reid.png":()=>A(()=>import("./reid-4fHk3wf1.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/vincent.png":()=>A(()=>import("./vincent-B6wzfCRC.js"),[]).then(n=>n.default),"../../assets/skins/boys trendy/wyatt.png":()=>A(()=>import("./wyatt-BOEJ0fmh.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/adrian.png":()=>A(()=>import("./adrian-ox52wbN-.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/alexander.png":()=>A(()=>import("./alexander-DFEiFnHt.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/austin.png":()=>A(()=>import("./austin-BU2HDqBL.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/benjamin.png":()=>A(()=>import("./benjamin-ZS7p7Pa4.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/connor.png":()=>A(()=>import("./connor-Dt0oP6AN.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/cooper.png":()=>A(()=>import("./cooper-CM3MjfjF.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/hunter.png":()=>A(()=>import("./hunter-Dctj-3f-.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/nicholas.png":()=>A(()=>import("./nicholas-DCpxDwKo.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/roman.png":()=>A(()=>import("./roman-BmbB4eMM.js"),[]).then(n=>n.default),"../../assets/skins/boys urban/timothy.png":()=>A(()=>import("./timothy-DYEQpXO0.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/anthony.png":()=>A(()=>import("./anthony-BgaeA3I-.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/brandon.png":()=>A(()=>import("./brandon-ByD9y29J.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/eric.png":()=>A(()=>import("./eric-D0ttfnXV.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/gavin.png":()=>A(()=>import("./gavin-BV6B1xYG.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/george.png":()=>A(()=>import("./george-CF0A_Zf_.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/henry.png":()=>A(()=>import("./henry-c6CnTW4u.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/isaac.png":()=>A(()=>import("./isaac-H-VFcefr.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/jonathan.png":()=>A(()=>import("./jonathan-DAU2IEXQ.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/nicholas.png":()=>A(()=>import("./nicholas-0UTfH4HE.js"),[]).then(n=>n.default),"../../assets/skins/boys youtube/paul.png":()=>A(()=>import("./paul-RT7drH_0.js"),[]).then(n=>n.default),"../../assets/skins/girls animal/aisha.png":()=>A(()=>import("./aisha-BR20gbJa.js"),[]).then(n=>n.default),"../../assets/skins/girls christmas/gabriella.png":()=>A(()=>import("./gabriella-QdIRnyY0.js"),[]).then(n=>n.default),"../../assets/skins/girls christmas/hannah.png":()=>A(()=>import("./hannah-yJNbxBGF.js"),[]).then(n=>n.default),"../../assets/skins/girls christmas/sadie.png":()=>A(()=>import("./sadie-Cv_R-z6k.js"),[]).then(n=>n.default),"../../assets/skins/girls christmas/vanessa.png":()=>A(()=>import("./vanessa-CR5UMqXL.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/anastasia.png":()=>A(()=>import("./anastasia-DDHJpP8T.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/cassandra.png":()=>A(()=>import("./cassandra-DGgU4dNH.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/charlotte.png":()=>A(()=>import("./charlotte-DwGWRwap.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/daniela.png":()=>A(()=>import("./daniela-B2nwLt1D.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/diana.png":()=>A(()=>import("./diana-fbDxSNj_.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/kennedy.png":()=>A(()=>import("./kennedy-CqfKRT_-.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/megan.png":()=>A(()=>import("./megan-Bw0WijqK.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/mila.png":()=>A(()=>import("./mila-C9H-2CQv.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/natalia.png":()=>A(()=>import("./natalia-NJqQiZmJ.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/nova.png":()=>A(()=>import("./nova-SElL1XP1.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/rachel.png":()=>A(()=>import("./rachel-D3q2vkhi.js"),[]).then(n=>n.default),"../../assets/skins/girls classic/yasmin.png":()=>A(()=>import("./yasmin-0Kkv7n9k.js"),[]).then(n=>n.default),"../../assets/skins/girls default/julia.png":()=>A(()=>import("./julia-DjxW_yxr.js"),[]).then(n=>n.default),"../../assets/skins/girls default/lina.png":()=>A(()=>import("./lina-CHC9DmCK.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/anna.png":()=>A(()=>import("./anna-DQkV1R8i.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/annabelle.png":()=>A(()=>import("./annabelle-DxUACCj7.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/annie.png":()=>A(()=>import("./annie-D4g7p4aO.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/athena.png":()=>A(()=>import("./athena-9BCYw3mT.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/ava.png":()=>A(()=>import("./ava-BENwZyFn.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/daisy.png":()=>A(()=>import("./daisy-BC7gNKWf.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/elle.png":()=>A(()=>import("./elle-Dsz7zq9Y.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/lydia.png":()=>A(()=>import("./lydia-BpTGSBye.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/sadie.png":()=>A(()=>import("./sadie-9fM0K--4.js"),[]).then(n=>n.default),"../../assets/skins/girls disguise/selena.png":()=>A(()=>import("./selena-CVRarvWO.js"),[]).then(n=>n.default),"../../assets/skins/girls military/anastasia.png":()=>A(()=>import("./anastasia-D0lZ9wJn.js"),[]).then(n=>n.default),"../../assets/skins/girls military/annabelle.png":()=>A(()=>import("./annabelle-BC5W2mum.js"),[]).then(n=>n.default),"../../assets/skins/girls military/ashley.png":()=>A(()=>import("./ashley-gf3tiGLg.js"),[]).then(n=>n.default),"../../assets/skins/girls military/audrey.png":()=>A(()=>import("./audrey-Tlav0qiq.js"),[]).then(n=>n.default),"../../assets/skins/girls military/bethany.png":()=>A(()=>import("./bethany-29swI071.js"),[]).then(n=>n.default),"../../assets/skins/girls military/carmen.png":()=>A(()=>import("./carmen-yVdsKXBP.js"),[]).then(n=>n.default),"../../assets/skins/girls military/cassandra.png":()=>A(()=>import("./cassandra-D6E_6Lma.js"),[]).then(n=>n.default),"../../assets/skins/girls military/chloe.png":()=>A(()=>import("./chloe-DHxRqbDk.js"),[]).then(n=>n.default),"../../assets/skins/girls military/daniela.png":()=>A(()=>import("./daniela-tUKCy1B8.js"),[]).then(n=>n.default),"../../assets/skins/girls military/eleanor.png":()=>A(()=>import("./eleanor-BwWvt7yD.js"),[]).then(n=>n.default),"../../assets/skins/girls military/elise.png":()=>A(()=>import("./elise-DidsSqDb.js"),[]).then(n=>n.default),"../../assets/skins/girls military/gemma.png":()=>A(()=>import("./gemma-ribYfMJP.js"),[]).then(n=>n.default),"../../assets/skins/girls military/grace.png":()=>A(()=>import("./grace-Cy5PYzkW.js"),[]).then(n=>n.default),"../../assets/skins/girls military/isabelle.png":()=>A(()=>import("./isabelle-DFQBkHV7.js"),[]).then(n=>n.default),"../../assets/skins/girls military/jade.png":()=>A(()=>import("./jade-BgPF-yB-.js"),[]).then(n=>n.default),"../../assets/skins/girls military/jenna.png":()=>A(()=>import("./jenna-BuPAJ7nK.js"),[]).then(n=>n.default),"../../assets/skins/girls military/kennedy.png":()=>A(()=>import("./kennedy-CjR8Oxhs.js"),[]).then(n=>n.default),"../../assets/skins/girls military/kimberly.png":()=>A(()=>import("./kimberly-7TGIDshw.js"),[]).then(n=>n.default),"../../assets/skins/girls military/layla.png":()=>A(()=>import("./layla-DnH8zrdU.js"),[]).then(n=>n.default),"../../assets/skins/girls military/lila.png":()=>A(()=>import("./lila-DXlx1C6d.js"),[]).then(n=>n.default),"../../assets/skins/girls military/maya.png":()=>A(()=>import("./maya-CsYQjqr9.js"),[]).then(n=>n.default),"../../assets/skins/girls military/melanie.png":()=>A(()=>import("./melanie-DbSsuRQ-.js"),[]).then(n=>n.default),"../../assets/skins/girls military/natalia.png":()=>A(()=>import("./natalia-D9GTfs-Y.js"),[]).then(n=>n.default),"../../assets/skins/girls military/olivia.png":()=>A(()=>import("./olivia-BMmBj0aP.js"),[]).then(n=>n.default),"../../assets/skins/girls military/piper.png":()=>A(()=>import("./piper-oJE5mtgo.js"),[]).then(n=>n.default),"../../assets/skins/girls military/rosalie.png":()=>A(()=>import("./rosalie-BT-oRk7J.js"),[]).then(n=>n.default),"../../assets/skins/girls military/stella.png":()=>A(()=>import("./stella-CFLciYus.js"),[]).then(n=>n.default),"../../assets/skins/girls military/vanessa.png":()=>A(()=>import("./vanessa-BEHXyXoM.js"),[]).then(n=>n.default),"../../assets/skins/girls military/zoey.png":()=>A(()=>import("./zoey-CMDJfjNJ.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/abigail.png":()=>A(()=>import("./abigail-CkFYHPGB.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/alicia.png":()=>A(()=>import("./alicia-gvEJMRO_.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/audrey.png":()=>A(()=>import("./audrey-CVPZRpVF.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/bethany.png":()=>A(()=>import("./bethany-BluycUQi.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/carmen.png":()=>A(()=>import("./carmen-E1-SliBg.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/caroline.png":()=>A(()=>import("./caroline-CYnhtR3X.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/delilah.png":()=>A(()=>import("./delilah-5NByEUPU.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/elena.png":()=>A(()=>import("./elena-acGQ2tsH.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/evelyn.png":()=>A(()=>import("./evelyn-DtZrvuN9.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/fiona.png":()=>A(()=>import("./fiona-BEjM3KZj.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/lena.png":()=>A(()=>import("./lena-B5icBRM1.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/madison.png":()=>A(()=>import("./madison-DyAWb3sw.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/mia.png":()=>A(()=>import("./mia-D-4AXyhy.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/olivia.png":()=>A(()=>import("./olivia-BjPdD6uC.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/rachel.png":()=>A(()=>import("./rachel-DaVGPB76.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/sabrina.png":()=>A(()=>import("./sabrina-BpXXcRbi.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/sienna.png":()=>A(()=>import("./sienna-CBmCVsP1.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/stella.png":()=>A(()=>import("./stella-BsgxsP1Y.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/taylor.png":()=>A(()=>import("./taylor-DBqI5hVe.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/vanessa.png":()=>A(()=>import("./vanessa-D-D5qvNG.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/willow.png":()=>A(()=>import("./willow-SNkOeN15.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/yasmin.png":()=>A(()=>import("./yasmin-CaMQ5zZ8.js"),[]).then(n=>n.default),"../../assets/skins/girls trendy/zara.png":()=>A(()=>import("./zara-XOtM38hC.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/alexa.png":()=>A(()=>import("./alexa--jVSjRr-.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/alicia.png":()=>A(()=>import("./alicia-CNVr4-Tf.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/amy.png":()=>A(()=>import("./amy-4wnJZwaN.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/angela.png":()=>A(()=>import("./angela-SQlv2ZU1.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/aubrey.png":()=>A(()=>import("./aubrey-BGFFIjhC.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/audrey.png":()=>A(()=>import("./audrey-CtrgZRsL.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/carmen.png":()=>A(()=>import("./carmen-BLmz3r16.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/caroline.png":()=>A(()=>import("./caroline-Ckqs-WFN.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/delilah.png":()=>A(()=>import("./delilah-BySwbh1O.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/diana.png":()=>A(()=>import("./diana-CkMetUNu.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/freya.png":()=>A(()=>import("./freya-D2N13PMJ.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/hope.png":()=>A(()=>import("./hope-CD4IyOAL.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/lila.png":()=>A(()=>import("./lila-B1J1DBlu.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/natalie.png":()=>A(()=>import("./natalie-RuBDxTHV.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/rebecca.png":()=>A(()=>import("./rebecca-CZG-PZF3.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/rosalie.png":()=>A(()=>import("./rosalie-dt3wRl3_.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/taylor.png":()=>A(()=>import("./taylor-KckNDYBO.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/vanessa.png":()=>A(()=>import("./vanessa-2RBeLOda.js"),[]).then(n=>n.default),"../../assets/skins/girls urban/victoria.png":()=>A(()=>import("./victoria-TmyHn6XE.js"),[]).then(n=>n.default)}),sA=Object.assign({"../../assets/skins/girls classic/README.txt":()=>A(()=>import("./README-CfQRT4h_.js"),[])}),rA=n=>{const e=n.match(/assets\/skins\/([^/]+)\//);return e?e[1]:null},_d=n=>{const e=n.match(/^boys\s+(.+)$/i);if(e&&e[1])return{baseCategory:e[1].trim(),gender:"male"};const t=n.match(/^girls\s+(.+)$/i);return t&&t[1]?{baseCategory:t[1].trim(),gender:"female"}:{baseCategory:n.trim(),gender:"unknown"}},Vi=n=>({category:n.category,sourceCategory:n.sourceCategory,name:n.name,path:n.path,gender:n.gender}),Ad=Object.keys(gd).map(n=>{const e=n.match(/assets\/skins\/([^/]+)\/([^/]+)\.png$/);if(!e)return null;const[,t,i]=e,{baseCategory:s,gender:r}=_d(t);return{sourceCategory:t,baseCategory:s,gender:r,name:i,path:n}}).filter(n=>n!==null).sort((n,e)=>{const t=n.sourceCategory.localeCompare(e.sourceCategory);return t!==0?t:n.name.localeCompare(e.name)}),aA=Object.keys(sA).map(n=>rA(n)).filter(n=>n!==null),No=new Set;Ad.forEach(n=>No.add(n.sourceCategory));aA.forEach(n=>No.add(n));const rr=new Set;No.forEach(n=>{const e=_d(n);e.gender==="male"||e.gender==="female"?rr.add(e.baseCategory):rr.add(n)});const vd=Ad.map(n=>({category:n.gender==="male"||n.gender==="female"?n.baseCategory:n.sourceCategory,sourceCategory:n.sourceCategory,name:n.name,path:n.path,gender:n.gender})).sort((n,e)=>{const t=n.category.localeCompare(e.category);return t!==0?t:n.gender!==e.gender?n.gender.localeCompare(e.gender):n.name.localeCompare(e.name)});vd.forEach(n=>rr.add(n.category));const ar=new Map;vd.forEach(n=>{const e=ar.get(n.category)??[];e.push(n),ar.set(n.category,e)});const oA=[...rr].sort((n,e)=>n.localeCompare(e)).map(n=>{const e=(ar.get(n)??[]).map(s=>Vi(s)),t=e.some(s=>s.gender==="male"),i=e.some(s=>s.gender==="female");return{name:n,skins:e,previewSkinPath:e[0]?.path??null,hasMale:t,hasFemale:i,supportsGenderFilter:t&&i}}),co=new Map,cs=new Map,lA=n=>(ar.get(n)??[]).map(e=>Vi(e)),cA=()=>oA.map(n=>({name:n.name,skins:n.skins.map(e=>Vi(e)),previewSkinPath:n.previewSkinPath,hasMale:n.hasMale,hasFemale:n.hasFemale,supportsGenderFilter:n.supportsGenderFilter})),gc=async n=>{const e=co.get(n.path);if(e)return cs.set(e,Vi(n)),e;const t=gd[n.path];if(!t)return null;try{const i=await t();return co.set(n.path,i),cs.set(i,Vi(n)),i}catch{return null}},dA=n=>{const e=cs.get(n);return e?Vi(e):null},_c=n=>cs.get(n)?.name??null,hA=()=>{cs.clear(),co.clear()},uA=[new URL("/assets/panorama_0-C130K_z-.png",import.meta.url).href,new URL("/assets/panorama_1-Bi4QlnSC.png",import.meta.url).href,new URL("/assets/panorama_2-VlSWZaRQ.png",import.meta.url).href,new URL("/assets/panorama_3-B3Pu-mDD.png",import.meta.url).href,new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAFnklEQVR42u3VMQ0AAAgEsReOIFyCB1aaVMEtl+oB4KFIAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAKgAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQAYgAoABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGACAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGACAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgBgABIAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAGIAKAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAAAagAoABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABABgAAAYAgAEAYAAAGAAABgCAAQBgAAAYAAAGAIABAGAAABgAAAYAgAEAYAAAGAAABgDAzQI0a4A1nrPDEwAAAABJRU5ErkJggg==",import.meta.url).href,new URL("/assets/panorama_5-BlJokPgz.png",import.meta.url).href],fA=[1,3,4,5,0,2],yd=typeof navigator<"u"&&/firefox/i.test(navigator.userAgent),Ac=yd?.85:1,pA=yd?24:30,mA=1e3/pA;class gA{constructor(e){this.container=e,this.renderer=new Lo({antialias:!1,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,Ac)),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=St,this.renderer.domElement.className="menu-panorama-canvas",this.container.append(this.renderer.domElement),this.cubeTexture.colorSpace=St,this.cubeTexture.generateMipmaps=!1,this.cubeTexture.magFilter=Zt,this.cubeTexture.minFilter=Zt,this.cubeTexture.needsUpdate=!0,this.scene.background=this.cubeTexture,this.loadCubeTexture(),this.camera.position.set(0,0,0),this.camera.rotation.order="YXZ",this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.container),this.resize(),this.startLoop()}scene=new tr;camera=new It(85,1,.05,10);renderer;resizeObserver;clock=new td;cubeTexture=new xo;rafId=0;active=!0;lastRenderAt=0;disposed=!1;setActive(e){this.disposed||this.active===e||(this.active=e,this.active?this.startLoop():this.stopLoop())}dispose(){this.disposed=!0,this.stopLoop(),this.resizeObserver.disconnect(),this.scene.background=null,this.cubeTexture.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}resize(){if(this.disposed)return;const e=Math.max(20,this.container.clientWidth),t=Math.max(20,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,Ac)),this.renderer.setSize(e,t,!1)}startLoop(){this.disposed||!this.active||this.rafId!==0||(this.lastRenderAt=0,this.rafId=requestAnimationFrame(this.animate))}stopLoop(){this.rafId!==0&&(cancelAnimationFrame(this.rafId),this.rafId=0)}async loadCubeTexture(){try{const e=await Promise.all(fA.map(t=>this.loadPanoramaFace(uA[t])));if(this.disposed)return;this.cubeTexture.images=e,this.cubeTexture.needsUpdate=!0}catch{}}async loadPanoramaFace(e){return this.loadImage(e)}loadImage(e){return new Promise((t,i)=>{const s=new Image;s.decoding="async",s.onload=()=>t(s),s.onerror=()=>i(new Error(`Unable to load panorama face: ${e}`)),s.src=e})}animate=e=>{if(this.disposed||!this.active){this.rafId=0;return}if(this.rafId=requestAnimationFrame(this.animate),this.lastRenderAt!==0&&e-this.lastRenderAt<mA)return;this.lastRenderAt=e;const t=this.clock.getElapsedTime(),i=(25+Math.sin(t*.02)*5)*Math.PI/180,s=t*2*Math.PI/180;this.camera.rotation.x=-i,this.camera.rotation.y=s,this.camera.rotation.z=0,this.renderer.render(this.scene,this.camera)}}const _A=new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA7d7JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHku3/QAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADr4AAA6+AepCscAAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAi+SURBVHhe7VcJctw4DEz+/+gs+wJAShqP7aR2tyrtIbrRAA9pTv/4+fNXIPkzhEgh9XP9kVM4+9MoP2n8Yg+v9uuHqFENxpkXtN5j/aN5wY8yDl5EccMoY/FqlDEKpNM3G0l/LKK6YeLkCJAHlxp8jq2OncUIOICNG0b9wpnInjcGFzw8+QjfuQOLIS8sGX2pL8G6klcHyMmvjHKLB371GoBIenkX/C7UbgfWxlvp+QBnZy0pRqQ62z6JPsCxYen49UEUjq3xVdQnYdaF0Mq9wUvs5/401geRRO0LozyEPsg2AOlvnWAeIHxZWLk6win7HF/G3QHIPkdtsCIFchkI9Et/BfgklOqF2xKRM1AnVX+1fwkvPgf6ZOI/g/E2LJbq56Jiq6bcr6/cB8yoA/T1WtVBZKyx+d0vnko40is44XqA7NMbB9XR8Vpfwdao3EI7Xg5QGCch17r13BBDp99UE4kzT3sfwBzMCWQna/utdSRpq86X8DL9IjxRz7U7V4QwFfo4+8HSdnGdhx/vwDLSWpFqzdx6fcC+XztOO2n4+Q78JtwfqzF+FTPiyM7r7OSVymja+8JXbH4l7ufXMVSmz5yWGxnAESnbKqbbPBUw6pT8TUiv20aPGpXctyFCFMMc7DbOp3K+QLUOkB0QgHS4vys0sk7Zybuw4WrWfHI9Bfs2BBXWrZKGcruVS19RVePovjwFqYMjGfyclZ9ickmFwVG5kPaFehfkOtNYxlKK3SBmvPhtW7RFnPYf+xzYdn0B3gE2N2nubre4sMawKRA56C5AbEN9ehFq0FiRFXrMmVZ+MgI7mBCeIKvs5apPjAdSvA25tR5okFCykHnKLryqrLdhecxjHw2TRx/ABQgSAoAaSHYzZIQ5UH5Zh/sgijR4ADh60K0GwoXkzVoPIRw4v6yTMaReA4D9EstXKQsdC0bDpOdC+pCDK2WizJJc7wLnqLxkJQsj53Bb90NuKSOY2oU//nvgI+A/Ix9OfOZlrHAyAmiO9Nd0xs7bEfC/oSagB86Rz4XOgbjK7itWXQ3Fw4hD4AC1ICvJmQAS9I7BWCfct0rSC6WtHaC/jDySF2fiOTqsAZjHesJRP8A7AIAo+4TmjhypL7ahBiasi0ULV2eiD6Dl2AeBaWUoaqVxh9hTB67I3CYgOYyJOgAa1Oje48ou+WK2eVR0X7UvsGfkE//a5wAOiiPhJ9mGu4Pu3n02TMryt+4r6rtgdUqd+QJF1fNUAWAkN4jfXNOUi+e7QE7WzYurc6+AMHO3IQiSVWfGZSBXEFPO14AbUqFGam37bIOQDy1I1gUwQ0p5jjoAumGkQi2p4Y27ME4iErQP62LG6jlHH8AjJ1nEFSQTPAzKFabtFJFTHKunxgrg7SnYRF1Bs3xmK8UDQpbtxemP19PmwHqgr38O5GAnHuwnfHyAz6030FdOnmKsuf0goUhn+Yxk1XceA8RlLBBlAp1nB0L/mCyRwgqsd65+6rvRL9aMntC00EpQXv8dI5BpI7cadDfSmPmVI+zYLV/o5Snorn2l1JbpPq2QHO3OBXPSqQD2rrF9GcUEsBC1V0TqPESRAWx5zxOcB+l7PEA2gjAlD1EgcKwgTqNIOlkjfZcDfBnZ95OoH6XY3Sv46OU7ZbZQQnjoc1r19jUS8TZMbUM3PiALezzhUs+BjX4KlqCuK3rNCBJPfYwLFqHcGvfVAcAeXmHPb5i48cnVENGUMrmeghrjSigeuMZuF2t5wCLkhnC9CFdwwYmI+R0vYUK4spoAiyaqML8N5WhBcPLT33jh7NsZAbBoSpm8DtALfg5fnbcDd2BfaVyJcp84TVVm1vVjNLJOzQiYX36Q1LvE48STf7OBsFzOMTe0E78NWagrPU58crAyGGOwIaPnMY66DfP4LlBp3IEsePI+Vrh4Gur3QbCuhWAfd4B5OscB3ho97xz7hmiKL4jHJ6FU8SKoC0sWA8xhSKvuXKH9hrLxGsiVdA76iBEtHuotQEEu9OOf5R/hWLjxYAcu1+fAWCbSvnYIQ4CKHzbinDGe8KU74EVzAiEHNFIfbOjm91OQC2O6UFcoL+tSOxcr77gcScPrFBvpMuNdoAWRiSvn4MoywUswB4MykevhkXoK5s52xTsA0fbT6KkT8dYi1UCiQd7Wry4zfpBQpWHkNXHLs2CxfBpgSIzaX/XUoJTLefEaaH+OC3rfDcusjTPu8P3PgW9iHcDnwz3B7cLw4X3qg1M+Ef+sX/ytyu8CDf2tMhppufFg1ql2xD/rF3+rvn0HVsF5ykJ8kpUexL2PicblDqifLWk8mA1URmdUo75x+XGJD+8ADnwyKszDw+c0+2HJwWO9b7wGwk9++BGsfuNdEH7yw49g9RuvgfCTH34Eq/ggStvZ/pSbF1GFg7dzxv/pAfgcrUGHzDwYMn0bZv577kDyWzz5gg5wg498Lmye+UTqd36AA5zArMnB4XMhKuEpf/KFvwdYBzgbgvJvqzf1rc9PcVmnDv47B3A+1pBPIT9sqE5zQUbDdlmnDj5zB46u13WvX9apA/13fIO0pb+ZdA8u/9ygshost3eB3UVdnzjq1We/4OoVKqtm+fcAtx9EGzjz2GGi62kLtyjQ6HZwH8AGCEKsi2QhiJFiqiOVY38g9WgM/W+oxzbiKZCBauBDdZNCJxXVYZapIgb+O+66CwQLFmc6Ckk5f4lhIoXkoxkyLTqAfpTawCCWoLaRlLFVpTOZnlLuGibAGB/egTFAEGqUrdwZhTljBXU0o7vq22sghQjozIOIbxxGt1GtUJ1AZenTqHfB3v2Msw/7vDP3qWd8DrilO0t5h0uD8Lw/j8aghOYBfxlBpuFkCGobRXmO4lxAv+u3beMpyEHc2O1LMWlngabdrTCw19NV+xBv3oHm7g8q3e0FTygW9vnvvAZOFrDM6QyucjNpCGLcgUd4vtip8lfzesKBfb/La+BklhRm+gZq/kuMp+ARWuet5Ta8MePXr38AsR8Obsh0700AAAAASUVORK5CYII=",import.meta.url).href,AA=63,vc=16,Nn=8;let ra=null;const yc=new Map,vA=n=>{const e=n.charCodeAt(0);return Number.isNaN(e)||e<0||e>255?AA:e},bd=()=>(ra||(ra=new Promise((n,e)=>{const t=new Image;t.decoding="async",t.onload=()=>n(t),t.onerror=()=>e(new Error("Failed to load ascii font atlas.")),t.src=_A})),ra),yA=async n=>{const e=yc.get(n);if(e)return e;const t=await bd(),i=n%vc*Nn,s=Math.floor(n/vc)*Nn,r=document.createElement("canvas");r.width=Nn,r.height=Nn;const a=r.getContext("2d");if(!a)return"";a.imageSmoothingEnabled=!1,a.drawImage(t,i,s,Nn,Nn,0,0,Nn,Nn);const o=r.toDataURL("image/png");return yc.set(n,o),o},bA=(n,e)=>{const t=String(e);n.dataset.glyphCode=t,yA(e).then(i=>{!i||n.dataset.glyphCode!==t||(n.style.backgroundImage=`url("${i}")`)}).catch(()=>{})},SA=n=>{const e=document.createElement("span");return e.className="bitmap-glyph",n===" "?(e.classList.add("space"),e):(bA(e,vA(n)),e)},aa=(n,e={})=>{const t=document.createElement("span");t.className="bitmap-text",e.className&&(t.className=`bitmap-text ${e.className}`),typeof e.glyphGapEm=="number"&&t.style.setProperty("--glyph-gap",`${e.glyphGapEm}em`);const i=(e.uppercase?n.toUpperCase():n).replace(/\r?\n/g," ");t.setAttribute("role","img"),t.setAttribute("aria-label",e.ariaLabel??n);for(const s of i)t.append(SA(s));return t};bd().catch(()=>{});const EA=`Every block tells a story\r
Build rough, then build right\r
One voxel at a time\r
Small chunks, big adventures\r
Ship first, polish after\r
`,MA=new Set(["singleplayer","create-world","edit-world","settings","languages","keybindings","graphics","stats"]),oa=EA.split(/\r?\n/).map(n=>n.trim()).filter(n=>n.length>0),xA=()=>{if(oa.length===0)return"Construis ton monde, bloc par bloc.";const n=Math.floor(Math.random()*oa.length);return oa[n]};class wA{constructor(e,t){this.handlers=t,this.root.className="menu-layer",this.panoramaHost.className="menu-panorama",this.classicBackdrop.className="menu-classic-backdrop",this.vignette.className="menu-vignette",this.wardrobeShade.className="wardrobe-shade",this.panel.className="menu-panel",this.panorama=new gA(this.panoramaHost),this.panoramaHost.dataset.panorama=this.panorama?"ready":"off";const i=this.buildHomeView(),s=this.buildSingleplayerView(),r=this.buildCreateWorldView(),a=this.buildEditWorldView(),o=this.buildSettingsView(),l=this.buildLanguagesView(),c=this.buildKeybindingsView(),d=this.buildGraphicsView(),h=this.buildStatsView(),u=this.buildPauseView(),p=this.buildWardrobeView();this.views.set("home",i),this.views.set("singleplayer",s),this.views.set("create-world",r),this.views.set("edit-world",a),this.views.set("settings",o),this.views.set("languages",l),this.views.set("keybindings",c),this.views.set("graphics",d),this.views.set("stats",h),this.views.set("pause",u),this.views.set("wardrobe",p),this.panel.append(i,s,r,a,o,l,c,d,h,u,p),this.root.append(this.panoramaHost,this.classicBackdrop,this.vignette,this.wardrobeShade,this.panel),e.append(this.root),window.addEventListener("resize",this.handleHomeAlignmentResize),this.createNameInput.value=this.t("worldNamePlaceholder"),this.wardrobeImportInput.type="file",this.wardrobeImportInput.accept="image/png",this.wardrobeImportInput.addEventListener("change",()=>{const g=this.wardrobeImportInput.files?.[0];if(!g)return;const v=g.name.replace(/\.[^.]+$/,""),m=new FileReader;m.onload=()=>{typeof m.result=="string"&&(this.wardrobePendingImportedSkinName=v,this.wardrobePendingSkinName=v,this.wardrobePendingSkinUrl=m.result,this.currentScreen==="wardrobe"&&(this.highlightSelectedWardrobeCard(),this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName()),this.wardrobeSkinViewer.setSkin(this.wardrobePendingSkinUrl),this.updateWardrobeValidateButton()))},m.readAsDataURL(g),this.wardrobeImportInput.value=""}),this.handleKeyCapture=this.handleKeyCapture.bind(this),window.addEventListener("keydown",this.handleKeyCapture),this.renderBindings(),this.syncSkinSelectionFromSettings(),this.resetWardrobePendingSelection(),this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderStatsView(),this.renderGraphicsView(),this.renderPauseView(),this.renderLanguageView(),this.refreshLocalizedText(),this.updateViewerSkins(),this.showScreen("home"),this.alignHomeToViewportCenter(),this.hide()}root=document.createElement("div");panoramaHost=document.createElement("div");classicBackdrop=document.createElement("div");vignette=document.createElement("div");wardrobeShade=document.createElement("div");panel=document.createElement("div");panorama;views=new Map;bindingButtons=new Map;languageButtons=new Map;wardrobeCategoryButtons=new Map;statsCategoryButtons=new Map;localizedUpdaters=[];worldPreviewCache=new Map;worldList=document.createElement("div");editWorldPreview=document.createElement("div");editWorldTitle=document.createElement("h3");editWorldMeta=document.createElement("div");editNameInput=document.createElement("input");createNameInput=document.createElement("input");createSeedInput=document.createElement("input");playWorldButton=document.createElement("button");editWorldButton=document.createElement("button");deleteWorldButton=document.createElement("button");saveEditWorldButton=document.createElement("button");startupFullscreenToggleButton=document.createElement("button");interfaceSizeToggleButton=document.createElement("button");statsList=document.createElement("div");wardrobeCategorySelect=document.createElement("select");wardrobeCategoryList=document.createElement("div");wardrobeGalleryHeader=document.createElement("div");wardrobeCategoryTitle=document.createElement("div");wardrobeHeaderRight=document.createElement("div");wardrobeFilterBar=document.createElement("div");wardrobeFilterButtons=new Map;wardrobeLoadingIndicator=document.createElement("span");wardrobeGallery=document.createElement("div");wardrobeImportInput=document.createElement("input");wardrobeEmptyLabel=document.createElement("div");wardrobeSkinName=document.createElement("div");wardrobeValidateButton=document.createElement("button");pauseTitle=document.createElement("h2");pauseMeta=document.createElement("div");pauseStats=document.createElement("dl");homeSkinViewer;wardrobeSkinViewer;mode="boot";currentScreen="home";settings=Zs();globalStats=sr();worlds=[];selectedWorldId=null;listeningBinding=null;pauseWorld=null;selectedWardrobeCategory="";wardrobeGenderFilter="all";wardrobeRenderRequestId=0;wardrobeCategoriesRenderKey="";wardrobeCategoryScrollTop=0;wardrobeCategoriesByName=new Map;wardrobeGalleryScrollByKey=new Map;wardrobeCardViewers=new Map;wardrobeCardObserver=null;wardrobeCategoryViewers=new Map;wardrobeCategoryObserver=null;currentWardrobeGalleryKey=null;selectedSkinUrl=null;importedSkinName=null;selectedSkinName=null;wardrobePendingSkinUrl=null;wardrobePendingImportedSkinName=null;wardrobePendingSkinName=null;wardrobeGalleryLoadObserver=null;wardrobeGallerySentinel=null;wardrobeGalleryPendingSkins=[];wardrobeGalleryNextIndex=0;wardrobeGalleryLoading=!1;wardrobeGalleryChunkSize=6;selectedStatsCategory="general";homeLeftColumn=null;homeActionsColumn=null;handleHomeAlignmentResize=()=>{this.alignHomeToViewportCenter()};setSettings(e){const t=this.settings.skinDataUrl,i=this.selectedWardrobeCategory,s=this.settings.language;this.settings={keyBindings:Ot(e.keyBindings),skinDataUrl:e.skinDataUrl,startFullscreen:e.startFullscreen,interfaceSize:e.interfaceSize,language:e.language};const r=s!==this.settings.language;this.renderBindings(),this.syncSkinSelectionFromSettings(),r&&this.refreshLocalizedText();const a=this.settings.skinDataUrl!==t;if(a&&this.resetWardrobePendingSelection(),this.renderGraphicsView(),this.renderLanguageView(),this.currentScreen==="wardrobe"){if(this.wardrobeCategoriesByName.size===0)this.renderWardrobe();else if(this.selectedWardrobeCategory!==i){const o=this.wardrobeCategoriesByName.get(this.selectedWardrobeCategory)??null;this.updateWardrobeCategoryButtons(),this.renderWardrobeFilterBar(o,this.wardrobeCategoriesByName.size),this.renderWardrobeGallery(o,this.wardrobeCategoriesByName.size)}else a&&(this.highlightSelectedWardrobeCard(),this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName()),this.wardrobeSkinViewer.setSkin(this.wardrobePendingSkinUrl));this.updateWardrobeValidateButton()}this.updateViewerSkins()}setGlobalStats(e){this.globalStats={...e},this.renderStatsView()}setWorlds(e){if(this.worlds=[...e],(!this.selectedWorldId||!this.worlds.some(t=>t.id===this.selectedWorldId))&&(this.selectedWorldId=this.worlds[0]?.id??null),this.currentScreen==="edit-world"&&!this.getSelectedWorld()){this.showScreen("singleplayer");return}this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderStatsView()}setSelectedWorld(e){if(e&&this.worlds.some(t=>t.id===e)?this.selectedWorldId=e:e===null&&(this.selectedWorldId=null),this.currentScreen==="edit-world"&&!this.getSelectedWorld()){this.showScreen("singleplayer");return}this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderStatsView()}setPauseWorld(e){this.pauseWorld=e?{id:e.id,name:e.name,seed:e.seed,worldStats:{...e.worldStats}}:null,this.renderPauseView()}showBoot(){this.mode="boot",this.root.style.display="grid",this.showScreen("home"),this.alignHomeToViewportCenter()}showPause(){this.mode="pause",this.root.style.display="grid",this.showScreen("pause")}hide(){this.root.style.display="none",this.listeningBinding=null,this.renderBindings(),this.updateMenuRenderActivity()}isVisible(){return this.root.style.display!=="none"}updateMenuRenderActivity(){const e=this.isVisible(),t=this.getSurfaceForScreen(this.currentScreen);this.panorama.setActive(e&&t==="panorama"),this.homeSkinViewer.setActive(e&&this.currentScreen==="home"),this.wardrobeSkinViewer.setActive(e&&this.currentScreen==="wardrobe")}getMode(){return this.mode}t(e){return Ft(`menu.${e}`,{},this.settings.language)}tf(e,t){return Ft(`menu.${e}`,t,this.settings.language)}registerLocalized(e){this.localizedUpdaters.push(e),e()}localizeText(e,t){this.registerLocalized(()=>{e.textContent=this.t(t)})}localizeInputPlaceholder(e,t){this.registerLocalized(()=>{e.placeholder=this.t(t)})}refreshLocalizedText(){this.localizedUpdaters.forEach(i=>i());const e=new Set(da.map(i=>Ft("menu.worldNamePlaceholder",{},i))),t=this.createNameInput.value.trim();(!t||e.has(t))&&(this.createNameInput.value=this.t("worldNamePlaceholder")),this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderBindings(),this.renderGraphicsView(),this.renderStatsView(),this.renderPauseView(),this.renderLanguageView(),this.currentScreen==="wardrobe"&&this.renderWardrobe()}buildHomeView(){const e=document.createElement("section");e.className="menu-view home-view";const t=document.createElement("div");t.className="home-layout";const i=document.createElement("div");i.className="home-left-column",this.homeLeftColumn=i;const s=document.createElement("div");s.className="title-masthead";const r=document.createElement("div");r.className="title-brand";const a=aa("MINEBLOW",{className:"menu-logo-text",ariaLabel:"Mineblow"}),o=document.createElement("div");o.className="menu-splash",o.textContent="1.0 ALPHA BUILD !!";const l=document.createElement("p");l.textContent=xA(),r.append(a,o),s.append(r,l);const c=document.createElement("div");c.className="title-actions",this.homeActionsColumn=c;const d=this.buildMainButton("homeWardrobe",()=>this.showScreen("wardrobe"));d.classList.add("mobile-wardrobe-button"),c.append(this.buildMainButton("homeSolo",()=>this.showScreen("singleplayer")),this.buildMainButton("homeMultiplayerSoon",()=>{},!0),this.buildMainButton("homeStats",()=>this.showScreen("stats")),this.buildMainButton("homeSettings",()=>this.showScreen("settings")),d),i.append(s,c);const h=document.createElement("div");h.className="home-right-column home-avatar-column";const u=document.createElement("div");u.className="menu-player-stage bare-player-stage home-avatar-stage",this.homeSkinViewer=new Qi(u,null,{animationMode:"spin"});const p=document.createElement("button");p.type="button",p.className="wardrobe-launch-button",this.registerLocalized(()=>{p.setAttribute("aria-label",this.t("homeWardrobe"))}),p.addEventListener("click",()=>this.showScreen("wardrobe"));const g=document.createElementNS("http://www.w3.org/2000/svg","svg");g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("aria-hidden","true"),g.classList.add("wardrobe-launch-icon-svg");const v=document.createElementNS("http://www.w3.org/2000/svg","path");return v.setAttribute("d","M9 3h6l2.4 2 3.1 1.4V11h-2.1v10H5.6V11H3.5V6.4L6.6 5 9 3z"),v.setAttribute("fill","currentColor"),g.append(v),p.append(g),h.append(u,p),t.append(i,h),e.append(t),e}buildSingleplayerView(){const e=document.createElement("section");e.className="menu-view menu-view-classic singleplayer-view",e.append(this.buildClassicTitle("singleplayerTitle"));const t=document.createElement("div");t.className="classic-screen-frame world-select-frame",this.worldList.className="minecraft-world-list",t.append(this.worldList);const i=document.createElement("div");i.className="classic-footer-stack";const s=document.createElement("div");s.className="classic-footer-row two-columns",this.playWorldButton.type="button",this.playWorldButton.className="menu-button",this.localizeText(this.playWorldButton,"play"),this.playWorldButton.addEventListener("click",()=>{this.selectedWorldId&&this.handlers.onPlayWorld(this.selectedWorldId)});const r=document.createElement("button");r.type="button",r.className="menu-button",this.localizeText(r,"createWorld"),r.addEventListener("click",()=>this.openCreateWorldScreen()),s.append(this.playWorldButton,r);const a=document.createElement("div");a.className="classic-footer-row three-columns",this.editWorldButton.type="button",this.editWorldButton.className="menu-button",this.localizeText(this.editWorldButton,"edit"),this.editWorldButton.addEventListener("click",()=>this.openEditWorldScreen()),this.deleteWorldButton.type="button",this.deleteWorldButton.className="menu-button",this.localizeText(this.deleteWorldButton,"delete"),this.deleteWorldButton.addEventListener("click",()=>{const l=this.getSelectedWorld();l&&window.confirm(this.tf("deleteWorldConfirm",{world:l.name}))&&this.handlers.onDeleteWorld(l.id)});const o=document.createElement("button");return o.type="button",o.className="menu-button secondary",this.localizeText(o,"back"),o.addEventListener("click",()=>this.showScreen("home")),a.append(this.editWorldButton,this.deleteWorldButton,o),i.append(s,a),e.append(t,i),e}buildCreateWorldView(){const e=document.createElement("section");e.className="menu-view menu-view-classic create-world-view",e.append(this.buildClassicTitle("createWorldTitle"));const t=document.createElement("div");t.className="classic-screen-frame form-screen-frame";const i=document.createElement("div");i.className="classic-form-card";const s=document.createElement("label");s.className="classic-input-group";const r=document.createElement("span");this.localizeText(r,"worldNameLabel"),this.createNameInput.type="text",this.localizeInputPlaceholder(this.createNameInput,"worldNamePlaceholder"),s.append(r,this.createNameInput);const a=document.createElement("label");a.className="classic-input-group";const o=document.createElement("span");this.localizeText(o,"worldSeedLabel"),this.createSeedInput.type="text",this.localizeInputPlaceholder(this.createSeedInput,"worldSeedPlaceholder"),a.append(o,this.createSeedInput),i.append(s,a),t.append(i);const l=document.createElement("div");l.className="classic-footer-row two-columns";const c=document.createElement("button");c.type="button",c.className="menu-button",this.localizeText(c,"createWorldAction"),c.addEventListener("click",()=>{const h=this.createNameInput.value.trim()||this.t("worldNamePlaceholder"),u=this.createSeedInput.value.trim();this.handlers.onCreateWorld(h,u),this.createSeedInput.value=""});const d=document.createElement("button");return d.type="button",d.className="menu-button secondary",this.localizeText(d,"back"),d.addEventListener("click",()=>this.showScreen("singleplayer")),l.append(c,d),e.append(t,l),e}buildEditWorldView(){const e=document.createElement("section");e.className="menu-view menu-view-classic edit-world-view",e.append(this.buildClassicTitle("editWorldTitle"));const t=document.createElement("div");t.className="classic-screen-frame form-screen-frame";const i=document.createElement("div");i.className="world-edit-card",this.editWorldPreview.className="world-preview-large";const s=document.createElement("div");s.className="world-edit-detail",this.editWorldTitle.className="world-edit-title",this.editWorldMeta.className="world-edit-meta";const r=document.createElement("label");r.className="classic-input-group";const a=document.createElement("span");this.localizeText(a,"worldNameLabel"),this.editNameInput.type="text",this.localizeInputPlaceholder(this.editNameInput,"worldNameLabel"),r.append(a,this.editNameInput),s.append(this.editWorldTitle,this.editWorldMeta,r),i.append(this.editWorldPreview,s),t.append(i);const o=document.createElement("div");o.className="classic-footer-row two-columns",this.saveEditWorldButton.type="button",this.saveEditWorldButton.className="menu-button",this.localizeText(this.saveEditWorldButton,"save"),this.saveEditWorldButton.addEventListener("click",()=>{const c=this.getSelectedWorld();c&&(this.handlers.onRenameWorld(c.id,this.editNameInput.value.trim()),this.showScreen("singleplayer"))});const l=document.createElement("button");return l.type="button",l.className="menu-button secondary",this.localizeText(l,"back"),l.addEventListener("click",()=>this.showScreen("singleplayer")),o.append(this.saveEditWorldButton,l),e.append(t,o),e}buildSettingsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic settings-view",e.append(this.buildClassicTitle("settingsTitle"));const t=document.createElement("div");t.className="classic-screen-frame settings-screen-frame";const i=document.createElement("div");i.className="classic-button-stack settings-buttons-grid";const s=document.createElement("button");s.type="button",s.className="menu-button settings-compact-button",this.localizeText(s,"keyBindings"),s.addEventListener("click",()=>this.showScreen("keybindings"));const r=document.createElement("button");r.type="button",r.className="menu-button settings-compact-button",this.localizeText(r,"graphics"),r.addEventListener("click",()=>this.showScreen("graphics"));const a=document.createElement("button");a.type="button",a.className="menu-button settings-compact-button settings-language-button",this.registerLocalized(()=>{const c=Ho(this.settings.language,this.settings.language);a.textContent=`${this.t("language")}: ${c}`}),a.addEventListener("click",()=>this.showScreen("languages")),i.append(s,r,a),t.append(i);const o=document.createElement("div");o.className="classic-footer-row one-column";const l=document.createElement("button");return l.type="button",l.className="menu-button secondary",this.localizeText(l,"back"),l.addEventListener("click",()=>this.showScreen(this.mode==="pause"?"pause":"home")),o.append(l),e.append(t,o),e}buildLanguagesView(){const e=document.createElement("section");e.className="menu-view menu-view-classic languages-view",e.append(this.buildClassicTitle("languagesTitle"));const t=document.createElement("div");t.className="classic-screen-frame settings-screen-frame";const i=document.createElement("div");i.className="classic-button-stack graphics-options-stack",da.forEach(a=>{const o=document.createElement("button");o.type="button",o.className="menu-button settings-compact-button classic-tab-button",this.registerLocalized(()=>{o.textContent=Ho(a,this.settings.language)}),o.addEventListener("click",()=>{this.settings.language!==a&&(this.settings={keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:a},this.refreshLocalizedText(),this.handlers.onSettingsChange({keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:a}))}),this.languageButtons.set(a,o),i.append(o)}),t.append(i);const s=document.createElement("div");s.className="classic-footer-row one-column";const r=document.createElement("button");return r.type="button",r.className="menu-button secondary",this.localizeText(r,"back"),r.addEventListener("click",()=>this.showScreen("settings")),s.append(r),e.append(t,s),e}buildGraphicsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic graphics-view",e.append(this.buildClassicTitle("graphicsTitle"));const t=document.createElement("div");t.className="classic-screen-frame settings-screen-frame";const i=document.createElement("div");i.className="classic-button-stack graphics-options-stack",this.startupFullscreenToggleButton.type="button",this.startupFullscreenToggleButton.className="menu-button settings-compact-button",this.startupFullscreenToggleButton.addEventListener("click",()=>{this.settings={keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:!this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language},this.renderGraphicsView(),this.handlers.onSettingsChange({keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language})}),this.interfaceSizeToggleButton.type="button",this.interfaceSizeToggleButton.className="menu-button settings-compact-button",this.interfaceSizeToggleButton.addEventListener("click",()=>{this.settings={keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:Bd(this.settings.interfaceSize),language:this.settings.language},this.renderGraphicsView(),this.handlers.onSettingsChange({keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language})}),i.append(this.startupFullscreenToggleButton,this.interfaceSizeToggleButton),t.append(i);const s=document.createElement("div");s.className="classic-footer-row one-column";const r=document.createElement("button");return r.type="button",r.className="menu-button secondary",this.localizeText(r,"back"),r.addEventListener("click",()=>this.showScreen("settings")),s.append(r),e.append(t,s),e}buildKeybindingsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic keybindings-view",e.append(this.buildClassicTitle("keybindingsTitle"));const t=document.createElement("div");t.className="classic-screen-frame keybindings-screen-frame";const i=document.createElement("div");i.className="binding-list",$s.forEach(o=>{const l=document.createElement("div");l.className="binding-row";const c=document.createElement("div");c.className="binding-label",this.registerLocalized(()=>{c.textContent=Ud(o,this.settings.language)});const d=document.createElement("div");d.className="binding-buttons";const h=document.createElement("button");h.type="button",h.className="binding-button",h.addEventListener("click",()=>this.startBindingCapture(o,"primary")),this.bindingButtons.set(`${o}:primary`,h);const u=document.createElement("button");u.type="button",u.className="binding-button",u.addEventListener("click",()=>this.startBindingCapture(o,"secondary")),this.bindingButtons.set(`${o}:secondary`,u),d.append(h,u),l.append(c,d),i.append(l)}),t.append(i);const s=document.createElement("div");s.className="classic-footer-row two-columns";const r=document.createElement("button");r.type="button",r.className="menu-button",this.localizeText(r,"resetDefaults"),r.addEventListener("click",()=>{const o=Zs();this.settings={keyBindings:Ot(o.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language},this.renderBindings(),this.handlers.onSettingsChange({keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language})});const a=document.createElement("button");return a.type="button",a.className="menu-button secondary",this.localizeText(a,"back"),a.addEventListener("click",()=>this.showScreen("settings")),s.append(r,a),e.append(t,s),e}buildStatsView(){const e=document.createElement("section");e.className="menu-view menu-view-classic stats-view",e.append(this.buildClassicTitle("statsTitle"));const t=document.createElement("div");t.className="classic-screen-frame stats-screen-frame";const i=document.createElement("div");i.className="classic-tab-row";const s=document.createElement("button");s.type="button",s.className="menu-button classic-tab-button",this.localizeText(s,"statsGeneralTab"),s.addEventListener("click",()=>{this.selectedStatsCategory="general",this.renderStatsView()}),this.statsCategoryButtons.set("general",s);const r=document.createElement("button");r.type="button",r.className="menu-button classic-tab-button",this.localizeText(r,"statsItemsTab"),r.addEventListener("click",()=>{this.selectedStatsCategory="items",this.renderStatsView()}),this.statsCategoryButtons.set("items",r),i.append(s,r),this.statsList.className="stats-line-list",t.append(i,this.statsList);const a=document.createElement("div");a.className="classic-footer-row one-column";const o=document.createElement("button");return o.type="button",o.className="menu-button secondary",this.localizeText(o,"back"),o.addEventListener("click",()=>this.showScreen("home")),a.append(o),e.append(t,a),e}buildPauseView(){const e=document.createElement("section");e.className="menu-view pause-view";const t=document.createElement("div");t.className="menu-well pause-well",this.pauseMeta.className="menu-label",this.pauseStats.className="stats-list";const i=document.createElement("div");return i.className="title-actions",i.append(this.buildMainButton("pauseBackToGame",()=>{this.hide(),this.handlers.onResume()}),this.buildMainButton("pauseSettings",()=>this.showScreen("settings")),this.buildMainButton("pauseQuit",()=>this.handlers.onQuitToTitle())),t.append(this.pauseTitle,this.pauseMeta,this.pauseStats,i),e.append(t),e}buildWardrobeView(){const e=document.createElement("section");e.className="menu-view wardrobe-view",e.append(this.buildClassicTitle("wardrobeTitle"));const t=document.createElement("div");t.className="classic-layout wardrobe-layout";const i=document.createElement("div");i.className="wardrobe-category-rail",this.wardrobeCategorySelect.className="wardrobe-category-select",this.wardrobeCategorySelect.addEventListener("change",()=>{const c=this.wardrobeCategorySelect.value;c&&this.selectWardrobeCategory(c)}),this.wardrobeCategoryList.className="wardrobe-category-list",this.wardrobeCategoryList.addEventListener("scroll",()=>{this.wardrobeCategoryScrollTop=this.wardrobeCategoryList.scrollTop,this.hydrateVisibleWardrobeCategoryPreviews()}),i.append(this.wardrobeCategorySelect,this.wardrobeCategoryList);const s=document.createElement("div");s.className="menu-well",this.wardrobeGalleryHeader.className="wardrobe-gallery-header",this.wardrobeCategoryTitle.className="wardrobe-category-title",this.wardrobeHeaderRight.className="wardrobe-gallery-header-right",this.wardrobeFilterBar.className="wardrobe-filter-bar",this.wardrobeLoadingIndicator.className="wardrobe-loading-indicator",this.wardrobeLoadingIndicator.setAttribute("aria-hidden","true"),this.wardrobeHeaderRight.append(this.wardrobeLoadingIndicator,this.wardrobeFilterBar),this.wardrobeGalleryHeader.append(this.wardrobeCategoryTitle,this.wardrobeHeaderRight),this.wardrobeGallery.className="wardrobe-gallery",this.wardrobeGallery.addEventListener("scroll",()=>{if(!this.currentWardrobeGalleryKey)return;const c=this.wardrobeGallery.scrollTop;if(this.wardrobeGalleryScrollByKey.set(this.currentWardrobeGalleryKey,c),this.currentScreen!=="wardrobe"||this.wardrobeGalleryPendingSkins.length===0)return;this.wardrobeGallery.scrollHeight-(c+this.wardrobeGallery.clientHeight)<=220&&this.loadNextWardrobeGalleryChunk(this.wardrobeRenderRequestId),this.hydrateVisibleWardrobeCardPreviews()}),this.wardrobeEmptyLabel.className="empty-worlds",s.append(this.wardrobeGalleryHeader,this.wardrobeGallery,this.wardrobeEmptyLabel);const r=document.createElement("div");r.className="wardrobe-preview-column";const a=document.createElement("div");a.className="menu-player-stage bare-player-stage wardrobe-stage",this.wardrobeSkinViewer=new Qi(a,null,{animationMode:"showcase"}),this.wardrobeSkinName.className="wardrobe-skin-name",this.wardrobeValidateButton.type="button",this.wardrobeValidateButton.className="menu-button wardrobe-validate-button",this.localizeText(this.wardrobeValidateButton,"validate"),this.wardrobeValidateButton.addEventListener("click",()=>this.applyWardrobePendingSelection()),r.append(a,this.wardrobeSkinName,this.wardrobeValidateButton),t.append(i,s,r);const o=document.createElement("div");o.className="classic-footer-row one-column";const l=document.createElement("button");return l.type="button",l.className="menu-button secondary",this.localizeText(l,"back"),l.addEventListener("click",()=>{this.discardWardrobePendingSelection(),this.showScreen("home")}),o.append(l),e.append(t,o),e}buildClassicTitle(e,t){const i=document.createElement("div");i.className="classic-screen-header";const s=document.createElement("div");if(this.registerLocalized(()=>{const r=this.t(e),a=aa(r,{className:"classic-screen-title classic-title-text",uppercase:!0,ariaLabel:r,glyphGapEm:.04});s.replaceChildren(a)}),i.append(s),t){const r=document.createElement("p");r.className="classic-screen-subtitle",this.localizeText(r,t),i.append(r)}return i}buildMainButton(e,t,i=!1){const s=document.createElement("button");return s.type="button",s.className="menu-button menu-button-large",this.localizeText(s,e),s.disabled=i,s.addEventListener("click",t),s}showScreen(e){const t=this.currentScreen;this.currentScreen=e,this.panel.dataset.mode=this.mode,this.panel.dataset.screen=e,this.root.classList.toggle("wardrobe-darkened",e==="wardrobe"),this.views.forEach((i,s)=>{i.style.display=s===e?"grid":"none"}),this.applySurfaceForScreen(e),this.renderWorldSelection(),this.renderEditWorldScreen(),this.renderBindings(),this.renderGraphicsView(),this.renderPauseView(),this.renderStatsView(),this.renderLanguageView(),e==="wardrobe"?this.renderWardrobe():t==="wardrobe"&&(this.discardWardrobePendingSelection(),this.cleanupWardrobeView()),e==="home"&&this.alignHomeToViewportCenter(),this.updateMenuRenderActivity()}applySurfaceForScreen(e){const t=this.getSurfaceForScreen(e);this.root.dataset.surface=t,this.panoramaHost.style.display=t==="panorama"?"block":"none",this.vignette.style.display=t==="panorama"?"block":"none",this.classicBackdrop.style.display=t==="classic"?"block":"none"}getSurfaceForScreen(e){return this.mode==="pause"&&e==="pause"?"transparent":MA.has(e)?"classic":"panorama"}openCreateWorldScreen(){this.createNameInput.value.trim()||(this.createNameInput.value=this.t("worldNamePlaceholder")),this.showScreen("create-world")}openEditWorldScreen(){const e=this.getSelectedWorld();e&&(this.editNameInput.value=e.name,this.editNameInput.dataset.worldId=e.id,this.showScreen("edit-world"))}getSelectedWorld(){return this.worlds.find(e=>e.id===this.selectedWorldId)??null}renderWorldSelection(){if(this.worldList.replaceChildren(),this.worlds.length===0){const t=document.createElement("div");t.className="empty-worlds",t.textContent=this.t("emptyWorlds"),this.worldList.append(t)}else this.worlds.forEach(t=>{const i=document.createElement("button");i.type="button",i.className="world-entry",i.classList.toggle("selected",t.id===this.selectedWorldId),i.addEventListener("click",()=>{this.selectedWorldId=t.id,this.renderWorldSelection(),this.renderEditWorldScreen()}),i.addEventListener("dblclick",()=>this.handlers.onPlayWorld(t.id));const s=document.createElement("div");s.className="world-entry-preview",s.style.backgroundImage=`url("${this.getWorldPreviewUrl(t)}")`;const r=document.createElement("div");r.className="world-entry-detail";const a=document.createElement("strong");a.textContent=t.name;const o=document.createElement("span");o.textContent=this.tf("worldCreatedAt",{date:this.formatDate(t.createdAt)});const l=document.createElement("span");l.textContent=this.tf("worldLastPlayedAt",{date:this.formatDate(t.lastPlayedAt)}),r.append(a,o,l),i.append(s,r),this.worldList.append(i)});const e=this.getSelectedWorld()!==null;this.playWorldButton.disabled=!e,this.editWorldButton.disabled=!e,this.deleteWorldButton.disabled=!e}renderEditWorldScreen(){const e=this.getSelectedWorld();if(!e){this.editWorldPreview.style.backgroundImage="",this.editWorldTitle.textContent=this.t("noWorldSelected"),this.editWorldMeta.textContent="",this.editNameInput.value="",this.saveEditWorldButton.disabled=!0;return}this.editWorldPreview.style.backgroundImage=`url("${this.getWorldPreviewUrl(e)}")`,this.editWorldTitle.textContent=e.name,this.editWorldMeta.textContent=`${this.tf("worldCreatedAt",{date:this.formatDate(e.createdAt)})} | ${this.tf("worldLastPlayedAt",{date:this.formatDate(e.lastPlayedAt)})}`,(document.activeElement!==this.editNameInput||this.editNameInput.dataset.worldId!==e.id)&&(this.editNameInput.value=e.name,this.editNameInput.dataset.worldId=e.id),this.saveEditWorldButton.disabled=!1}renderStatsView(){this.statsCategoryButtons.forEach((t,i)=>{t.classList.toggle("active",i===this.selectedStatsCategory)});const e=this.selectedStatsCategory==="general"?[[this.t("playTime"),this.formatDuration(this.globalStats.totalPlayTimeMs)],[this.t("distanceTravelled"),`${Math.round(this.globalStats.totalDistanceTravelled).toLocaleString()} m`],[this.t("jumps"),this.globalStats.totalJumps.toLocaleString()],[this.t("worldsCreated"),this.globalStats.worldsCreated.toLocaleString()]]:[[this.t("blocksMined"),this.globalStats.totalBlocksMined.toLocaleString()],[this.t("blocksPlaced"),this.globalStats.totalBlocksPlaced.toLocaleString()],[this.t("craftedItems"),this.globalStats.totalCraftedItems.toLocaleString()],[this.t("worldsSaved"),this.worlds.length.toLocaleString()]];this.statsList.replaceChildren(...this.buildStatsRows(e))}renderPauseView(){const e=this.pauseWorld??{name:this.t("pauseDefaultWorldName"),seed:this.t("pauseNotAvailable"),worldStats:lo()};this.pauseTitle.textContent=e.name,this.pauseMeta.textContent=this.tf("pauseSeed",{seed:e.seed}),this.pauseStats.replaceChildren(...this.buildDefinitionListEntries([[this.t("playTime"),this.formatDuration(e.worldStats.playTimeMs)],[this.t("pauseBlocksMined"),e.worldStats.blocksMined.toLocaleString()],[this.t("pauseBlocksPlaced"),e.worldStats.blocksPlaced.toLocaleString()],[this.t("pauseDistance"),`${Math.round(e.worldStats.distanceTravelled).toLocaleString()} m`]]))}renderGraphicsView(){this.startupFullscreenToggleButton.textContent=`${this.t("fullscreen")}: ${this.settings.startFullscreen?this.t("stateOn"):this.t("stateOff")}`;const e=Tc(this.settings.interfaceSize);this.interfaceSizeToggleButton.textContent=`${this.t("interfaceSize")}: ${this.settings.interfaceSize} (${e}%)`}renderLanguageView(){this.languageButtons.forEach((e,t)=>{e.classList.toggle("active",t===this.settings.language)})}renderWardrobe(){this.resetWardrobePendingSelection();const e=cA();this.syncWardrobeCategories(e),e.length>0&&!this.wardrobeCategoriesByName.has(this.selectedWardrobeCategory)&&(this.selectedWardrobeCategory=e[0].name);const t=this.wardrobeCategoriesByName.get(this.selectedWardrobeCategory)??null;this.updateWardrobeCategoryButtons(),this.renderWardrobeFilterBar(t,e.length),this.wardrobeEmptyLabel.style.display="none",this.wardrobeEmptyLabel.textContent="",this.renderWardrobeGallery(t,e.length),this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName()),this.wardrobeSkinViewer.setSkin(this.wardrobePendingSkinUrl),this.updateWardrobeValidateButton()}syncWardrobeCategories(e){this.wardrobeCategoriesByName.clear(),e.forEach(i=>{this.wardrobeCategoriesByName.set(i.name,i)});const t=e.map(i=>`${i.name}:${i.skins.length}:${i.supportsGenderFilter?1:0}`).join("|");t===this.wardrobeCategoriesRenderKey&&this.wardrobeCategoryButtons.size>0||(this.wardrobeCategoriesRenderKey=t,this.renderWardrobeCategoryRail(e))}renderWardrobeCategoryRail(e){const t=this.wardrobeCategoryScrollTop;this.disposeWardrobeCategoryPreviews(),this.wardrobeCategoryButtons.clear(),this.wardrobeCategoryList.replaceChildren(),this.renderWardrobeCategorySelect(e),e.forEach(a=>{const o=document.createElement("button");o.type="button",o.className="wardrobe-category-tile",o.classList.toggle("active",a.name===this.selectedWardrobeCategory),o.addEventListener("click",()=>this.selectWardrobeCategory(a.name));const l=document.createElement("div");l.className="wardrobe-category-stage";const c=a.skins[0]??null;if(c)l.classList.add("loading-3d"),l.append(this.createWardrobe3dLoadingPlaceholder()),gc(c).then(h=>{if(!h||this.currentScreen!=="wardrobe"||!l.isConnected)return;l.dataset.skinUrl=h,this.ensureWardrobeCategoryObserver().observe(l),this.hydrateVisibleWardrobeCategoryPreviews()});else{l.classList.add("empty");const h=document.createElement("span");h.className="wardrobe-category-stage-label",h.textContent=a.name.slice(0,1).toUpperCase(),l.append(h)}const d=document.createElement("span");d.textContent=a.name,o.append(l,d),this.wardrobeCategoryButtons.set(a.name,o),this.wardrobeCategoryList.append(o)});const i=document.createElement("label");i.className="wardrobe-category-tile wardrobe-import-tile";const s=document.createElement("span");s.className="wardrobe-import-plus",s.textContent="+";const r=document.createElement("span");r.textContent=this.t("import"),i.append(s,r,this.wardrobeImportInput),this.wardrobeCategoryList.append(i),requestAnimationFrame(()=>{this.wardrobeCategoryList.scrollTop=t,this.hydrateVisibleWardrobeCategoryPreviews()})}renderWardrobeCategorySelect(e){if(this.wardrobeCategorySelect.replaceChildren(),e.length===0){const t=document.createElement("option");t.value="",t.textContent=this.t("noCategory"),this.wardrobeCategorySelect.append(t),this.wardrobeCategorySelect.disabled=!0,this.wardrobeCategorySelect.value="";return}e.forEach(t=>{const i=document.createElement("option");i.value=t.name,i.textContent=t.name.toUpperCase(),this.wardrobeCategorySelect.append(i)}),this.wardrobeCategorySelect.disabled=!1,this.updateWardrobeCategorySelect()}updateWardrobeCategorySelect(){this.wardrobeCategorySelect.disabled||(this.wardrobeCategorySelect.value=this.selectedWardrobeCategory)}selectWardrobeCategory(e){if(e===this.selectedWardrobeCategory)return;this.selectedWardrobeCategory=e,this.wardrobeGenderFilter="all",this.updateWardrobeCategoryButtons();const t=this.wardrobeCategoriesByName.get(e)??null;this.renderWardrobeFilterBar(t,this.wardrobeCategoriesByName.size),this.renderWardrobeGallery(t,this.wardrobeCategoriesByName.size)}renderWardrobeFilterBar(e,t){if(this.wardrobeCategoryTitle.textContent=e?e.name:t===0?this.t("noCategory"):"",this.wardrobeFilterButtons.clear(),this.wardrobeFilterBar.replaceChildren(),!e||!e.supportsGenderFilter){this.wardrobeGenderFilter="all",this.wardrobeFilterBar.style.display="none";return}this.wardrobeFilterBar.style.display="flex",[{value:"all",label:this.t("all")},{value:"male",label:this.t("male")},{value:"female",label:this.t("female")}].forEach(s=>{const r=document.createElement("button");r.type="button",r.className="menu-button wardrobe-filter-button",r.textContent=s.label,r.addEventListener("click",()=>{this.wardrobeGenderFilter!==s.value&&(this.wardrobeGenderFilter=s.value,this.updateWardrobeFilterButtons(),this.renderWardrobeGallery(e,t))}),this.wardrobeFilterButtons.set(s.value,r),this.wardrobeFilterBar.append(r)}),this.updateWardrobeFilterButtons()}updateWardrobeCategoryButtons(){this.wardrobeCategoryButtons.forEach((e,t)=>{e.classList.toggle("active",t===this.selectedWardrobeCategory)}),this.updateWardrobeCategorySelect()}updateWardrobeFilterButtons(){this.wardrobeFilterButtons.forEach((e,t)=>{e.classList.toggle("active",t===this.wardrobeGenderFilter)})}createWardrobe3dLoadingPlaceholder(){const e=document.createElement("span");return e.className="wardrobe-3d-loading",e.setAttribute("aria-hidden","true"),e}filterWardrobeSkins(e){return this.wardrobeGenderFilter==="all"?e:e.filter(t=>t.gender===this.wardrobeGenderFilter)}getWardrobeGalleryKey(e){return e?`${e.name}:${this.wardrobeGenderFilter}`:"__none__"}async renderWardrobeGallery(e,t){this.currentWardrobeGalleryKey&&this.wardrobeGalleryScrollByKey.set(this.currentWardrobeGalleryKey,this.wardrobeGallery.scrollTop);const i=++this.wardrobeRenderRequestId,s=this.getWardrobeGalleryKey(e),r=this.wardrobeGalleryScrollByKey.get(s)??0;if(this.disposeWardrobeCardPreviews(),this.resetWardrobeGalleryPagination(),this.wardrobeGallery.replaceChildren(),this.wardrobeGallery.scrollTop=0,this.currentWardrobeGalleryKey=s,this.setWardrobeLoadingIndicator(!1),!e){this.wardrobeEmptyLabel.style.display="",this.wardrobeEmptyLabel.textContent=t===0?this.t("noCategoryDot"):this.t("noSkinDot");return}const a=this.filterWardrobeSkins(lA(e.name));if(a.length===0){this.wardrobeEmptyLabel.style.display="",this.wardrobeEmptyLabel.textContent=this.t("noSkinDot");return}for(this.wardrobeEmptyLabel.style.display="none",this.wardrobeEmptyLabel.textContent="",this.wardrobeGalleryPendingSkins=a,this.wardrobeGalleryNextIndex=0,this.wardrobeGalleryLoading=!1,this.wardrobeGallerySentinel=document.createElement("div"),this.wardrobeGallerySentinel.className="wardrobe-gallery-sentinel",this.wardrobeGallery.append(this.wardrobeGallerySentinel),this.wardrobeGalleryLoadObserver=new IntersectionObserver(o=>{o.some(l=>l.isIntersecting)&&this.loadNextWardrobeGalleryChunk(i)},{root:this.wardrobeGallery,rootMargin:"220px 0px",threshold:0}),this.wardrobeGalleryLoadObserver.observe(this.wardrobeGallerySentinel),await this.loadNextWardrobeGalleryChunk(i);i===this.wardrobeRenderRequestId&&this.currentScreen==="wardrobe"&&this.wardrobeGalleryNextIndex<this.wardrobeGalleryPendingSkins.length&&this.wardrobeGallery.scrollHeight<r+this.wardrobeGallery.clientHeight+24;)await this.loadNextWardrobeGalleryChunk(i);i===this.wardrobeRenderRequestId&&this.currentScreen==="wardrobe"&&(this.wardrobeGallery.scrollTop=r),this.renderWardrobeSkinName(this.resolvePendingWardrobeSkinName())}resetWardrobeGalleryPagination(){this.wardrobeGalleryLoadObserver&&(this.wardrobeGalleryLoadObserver.disconnect(),this.wardrobeGalleryLoadObserver=null),this.wardrobeGallerySentinel&&(this.wardrobeGallerySentinel.remove(),this.wardrobeGallerySentinel=null),this.wardrobeGalleryPendingSkins=[],this.wardrobeGalleryNextIndex=0,this.wardrobeGalleryLoading=!1,this.setWardrobeLoadingIndicator(!1)}setWardrobeLoadingIndicator(e){this.wardrobeLoadingIndicator.classList.toggle("visible",e),this.wardrobeLoadingIndicator.setAttribute("aria-hidden",e?"false":"true")}async loadNextWardrobeGalleryChunk(e){if(this.wardrobeGalleryLoading)return;const t=this.wardrobeGalleryPendingSkins.length;if(this.wardrobeGalleryNextIndex>=t){this.setWardrobeLoadingIndicator(!1);return}const i=this.wardrobeGalleryNextIndex,s=Math.min(i+this.wardrobeGalleryChunkSize,t),r=this.wardrobeGalleryPendingSkins.slice(i,s);this.wardrobeGalleryLoading=!0,this.setWardrobeLoadingIndicator(!0);try{const a=await Promise.all(r.map(async c=>({skin:c,url:await gc(c)})));if(e!==this.wardrobeRenderRequestId||this.currentScreen!=="wardrobe")return;const o=this.ensureWardrobeCardObserver(),l=document.createDocumentFragment();if(a.forEach(({skin:c,url:d})=>{if(!d)return;const h=document.createElement("button");h.type="button",h.className="wardrobe-skin-card",h.dataset.skinUrl=d,h.title=c.name,h.classList.toggle("selected",d===this.wardrobePendingSkinUrl),h.addEventListener("click",()=>this.selectCatalogSkin(c,d));const u=document.createElement("div");u.className="wardrobe-skin-preview-3d loading-3d",u.dataset.skinUrl=d,u.dataset.skinName=c.name,u.append(this.createWardrobe3dLoadingPlaceholder()),o.observe(u);const p=document.createElement("span");p.className="wardrobe-skin-card-name",p.textContent=this.formatWardrobeSkinName(c.name),h.append(u,p),l.append(h),d===this.wardrobePendingSkinUrl&&(this.wardrobePendingSkinName=c.name)}),this.wardrobeGallerySentinel?this.wardrobeGallery.insertBefore(l,this.wardrobeGallerySentinel):this.wardrobeGallery.append(l),this.wardrobeGalleryNextIndex=s,this.highlightSelectedWardrobeCard(),this.hydrateVisibleWardrobeCardPreviews(),s>=t){this.wardrobeGalleryLoadObserver&&(this.wardrobeGalleryLoadObserver.disconnect(),this.wardrobeGalleryLoadObserver=null),this.wardrobeGallerySentinel&&(this.wardrobeGallerySentinel.remove(),this.wardrobeGallerySentinel=null),this.setWardrobeLoadingIndicator(!1);return}await new Promise(c=>{requestAnimationFrame(()=>c())}),this.wardrobeGallery.scrollHeight<=this.wardrobeGallery.clientHeight+8?requestAnimationFrame(()=>{this.loadNextWardrobeGalleryChunk(e)}):this.setWardrobeLoadingIndicator(!1)}finally{this.wardrobeGalleryLoading=!1,(e!==this.wardrobeRenderRequestId||this.currentScreen!=="wardrobe")&&this.setWardrobeLoadingIndicator(!1)}}ensureWardrobeCardObserver(){return this.wardrobeCardObserver?this.wardrobeCardObserver:(this.wardrobeCardObserver=new IntersectionObserver(e=>{e.forEach(t=>{const i=t.target;if(!t.isIntersecting){this.disposeWardrobeCardViewer(i);return}this.mountWardrobeCardViewer(i)})},{root:this.wardrobeGallery,rootMargin:"24px 0px",threshold:.1}),this.wardrobeCardObserver)}mountWardrobeCardViewer(e){if(this.wardrobeCardViewers.has(e))return;const t=e.dataset.skinUrl;if(t)try{const i=new Qi(e,t,{animated:!1});this.wardrobeCardViewers.set(e,i),e.classList.add("has-3d"),e.classList.remove("loading-3d")}catch{e.classList.remove("has-3d"),e.classList.add("loading-3d")}}isWardrobePreviewVisible(e){const t=e.getBoundingClientRect(),i=this.wardrobeGallery.getBoundingClientRect();return t.bottom>i.top-40&&t.top<i.bottom+40&&t.right>i.left&&t.left<i.right}disposeWardrobeCardViewer(e,t=!0){const i=this.wardrobeCardViewers.get(e);i&&(i.dispose(),e.classList.remove("has-3d"),e.classList.add("loading-3d"),this.wardrobeCardViewers.delete(e),t&&this.hydrateVisibleWardrobeCardPreviews())}disposeWardrobeCardPreviews(){this.wardrobeCardObserver&&(this.wardrobeCardObserver.disconnect(),this.wardrobeCardObserver=null),this.wardrobeCardViewers.forEach((e,t)=>{e.dispose(),t.classList.remove("has-3d"),t.classList.add("loading-3d")}),this.wardrobeCardViewers.clear()}hydrateVisibleWardrobeCardPreviews(){if(this.currentScreen!=="wardrobe")return;const e=this.wardrobeGallery.querySelectorAll(".wardrobe-skin-preview-3d");for(const t of e)this.wardrobeCardViewers.has(t)||!this.isWardrobePreviewVisible(t)||this.mountWardrobeCardViewer(t)}ensureWardrobeCategoryObserver(){return this.wardrobeCategoryObserver?this.wardrobeCategoryObserver:(this.wardrobeCategoryObserver=new IntersectionObserver(e=>{e.forEach(t=>{const i=t.target;if(!t.isIntersecting){this.disposeWardrobeCategoryViewer(i);return}this.mountWardrobeCategoryViewer(i)})},{root:this.wardrobeCategoryList,rootMargin:"32px 0px",threshold:.1}),this.wardrobeCategoryObserver)}mountWardrobeCategoryViewer(e){if(this.wardrobeCategoryViewers.has(e))return;const t=e.dataset.skinUrl;if(t)try{const i=new Qi(e,t,{animated:!1});this.wardrobeCategoryViewers.set(e,i),e.classList.add("has-3d"),e.classList.remove("loading-3d")}catch{e.classList.remove("has-3d"),e.classList.add("loading-3d")}}isWardrobeCategoryPreviewVisible(e){const t=e.getBoundingClientRect(),i=this.wardrobeCategoryList.getBoundingClientRect();return t.bottom>i.top-40&&t.top<i.bottom+40&&t.right>i.left&&t.left<i.right}disposeWardrobeCategoryViewer(e){const t=this.wardrobeCategoryViewers.get(e);t&&(t.dispose(),e.classList.remove("has-3d"),e.classList.add("loading-3d"),this.wardrobeCategoryViewers.delete(e))}disposeWardrobeCategoryPreviews(){this.wardrobeCategoryObserver&&(this.wardrobeCategoryObserver.disconnect(),this.wardrobeCategoryObserver=null),this.wardrobeCategoryViewers.forEach((e,t)=>{e.dispose(),t.classList.remove("has-3d"),t.classList.add("loading-3d")}),this.wardrobeCategoryViewers.clear()}hydrateVisibleWardrobeCategoryPreviews(){if(this.currentScreen!=="wardrobe")return;const e=this.wardrobeCategoryList.querySelectorAll(".wardrobe-category-stage[data-skin-url]");for(const t of e)this.wardrobeCategoryViewers.has(t)||!this.isWardrobeCategoryPreviewVisible(t)||this.mountWardrobeCategoryViewer(t)}highlightSelectedWardrobeCard(){const e=this.wardrobePendingSkinUrl;this.wardrobeGallery.querySelectorAll(".wardrobe-skin-card").forEach(t=>{t.classList.toggle("selected",e!==null&&t.dataset.skinUrl===e)})}resolveCommittedWardrobeSkinName(){const e=this.settings.skinDataUrl;if(!e)return this.t("defaultSkin");if(this.selectedSkinName)return this.selectedSkinName;const t=_c(e);return t?(this.selectedSkinName=this.formatWardrobeSkinName(t),this.selectedSkinName):this.importedSkinName?(this.selectedSkinName=this.importedSkinName,this.importedSkinName):this.t("importedSkin")}resolvePendingWardrobeSkinName(){const e=this.wardrobePendingSkinUrl;if(!e)return this.wardrobePendingSkinName=this.t("defaultSkin"),this.t("defaultSkin");if(this.wardrobePendingSkinName)return this.wardrobePendingSkinName;const t=_c(e);return t?(this.wardrobePendingSkinName=this.formatWardrobeSkinName(t),this.wardrobePendingSkinName):this.wardrobePendingImportedSkinName?(this.wardrobePendingSkinName=this.wardrobePendingImportedSkinName,this.wardrobePendingImportedSkinName):(this.wardrobePendingSkinName=this.t("importedSkin"),this.t("importedSkin"))}formatWardrobeSkinName(e){return e&&e.charAt(0).toUpperCase()+e.slice(1)}selectCatalogSkin(e,t){this.selectedWardrobeCategory=e.category,this.wardrobePendingSkinUrl=t,this.wardrobePendingImportedSkinName=null,this.wardrobePendingSkinName=this.formatWardrobeSkinName(e.name),this.highlightSelectedWardrobeCard(),this.renderWardrobeSkinName(this.wardrobePendingSkinName),this.wardrobeSkinViewer.setSkin(t),this.updateWardrobeValidateButton()}syncSkinSelectionFromSettings(){const e=this.settings.skinDataUrl;if(this.selectedSkinUrl=e,!e){this.selectedSkinName=this.t("defaultSkin");return}const t=dA(e);if(t){this.selectedWardrobeCategory=t.category,this.importedSkinName=null,this.selectedSkinName=this.formatWardrobeSkinName(t.name);return}this.importedSkinName?this.selectedSkinName=this.importedSkinName:this.selectedSkinName=this.t("importedSkin")}resetWardrobePendingSelection(){this.wardrobePendingSkinUrl=this.selectedSkinUrl,this.wardrobePendingImportedSkinName=this.importedSkinName,this.wardrobePendingSkinName=this.resolveCommittedWardrobeSkinName(),this.updateWardrobeValidateButton()}discardWardrobePendingSelection(){this.resetWardrobePendingSelection()}hasWardrobePendingChanges(){return this.wardrobePendingSkinUrl!==this.settings.skinDataUrl}updateWardrobeValidateButton(){this.wardrobeValidateButton.disabled=!this.hasWardrobePendingChanges()}applyWardrobePendingSelection(){this.hasWardrobePendingChanges()&&(this.selectedSkinUrl=this.wardrobePendingSkinUrl,this.importedSkinName=this.wardrobePendingImportedSkinName,this.selectedSkinName=this.wardrobePendingSkinName,this.commitSkinSelection(this.wardrobePendingSkinUrl),this.updateWardrobeValidateButton())}updateViewerSkins(){this.homeSkinViewer.setSkin(this.settings.skinDataUrl);const e=this.currentScreen==="wardrobe"?this.wardrobePendingSkinUrl:this.settings.skinDataUrl;this.wardrobeSkinViewer.setSkin(e)}alignHomeToViewportCenter(){if(this.currentScreen!=="home"||!this.homeActionsColumn||!this.homeLeftColumn)return;this.panel.style.setProperty("--home-center-nudge","0px");const e=t=>{if(!this.homeActionsColumn||!this.homeLeftColumn||this.currentScreen!=="home")return;const i=this.homeActionsColumn.getBoundingClientRect(),s=i.left+i.width/2,a=window.innerWidth/2-s;if(Math.abs(a)<.5||t>=3)return;const o=Number.parseFloat(this.panel.style.getPropertyValue("--home-center-nudge").replace("px","")),l=(Number.isFinite(o)?o:0)+a;this.panel.style.setProperty("--home-center-nudge",`${l}px`),requestAnimationFrame(()=>e(t+1))};requestAnimationFrame(()=>e(0))}renderWardrobeSkinName(e){const t=aa(e,{className:"wardrobe-skin-name-text",uppercase:!0,ariaLabel:e,glyphGapEm:.02});this.wardrobeSkinName.replaceChildren(t)}cleanupWardrobeView(){this.wardrobeRenderRequestId+=1,this.disposeWardrobeCategoryPreviews(),this.disposeWardrobeCardPreviews(),this.resetWardrobeGalleryPagination(),this.wardrobeCategoryButtons.clear(),this.wardrobeCategoriesByName.clear(),this.wardrobeCategoriesRenderKey="",this.wardrobeGalleryScrollByKey.clear(),this.currentWardrobeGalleryKey=null,this.wardrobeFilterButtons.clear(),this.wardrobeCategoryList.replaceChildren(),this.wardrobeCategoryScrollTop=0,this.wardrobeCategoryList.scrollTop=0,this.wardrobeCategorySelect.replaceChildren(),this.wardrobeCategorySelect.disabled=!0,this.wardrobeCategorySelect.value="",this.wardrobeFilterBar.replaceChildren(),this.wardrobeFilterBar.style.display="none",this.wardrobeCategoryTitle.textContent="",this.setWardrobeLoadingIndicator(!1),this.wardrobeGallery.replaceChildren(),this.wardrobeEmptyLabel.style.display="none",this.wardrobeEmptyLabel.textContent="",hA()}commitSkinSelection(e){this.selectedSkinUrl=e,e||(this.importedSkinName=null,this.selectedSkinName=this.t("defaultSkin")),this.settings={keyBindings:Ot(this.settings.keyBindings),skinDataUrl:e,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language},this.handlers.onSettingsChange({keyBindings:Ot(this.settings.keyBindings),skinDataUrl:e,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language})}startBindingCapture(e,t){this.listeningBinding={action:e,slot:t},this.renderBindings()}handleKeyCapture(e){if(!this.isVisible()||!this.listeningBinding)return;e.preventDefault();const{action:t,slot:i}=this.listeningBinding;if(e.code==="Escape"){this.listeningBinding=null,this.renderBindings();return}i==="secondary"&&(e.code==="Backspace"||e.code==="Delete")?this.settings.keyBindings[t].secondary=null:i==="primary"?this.settings.keyBindings[t].primary=e.code:this.settings.keyBindings[t].secondary=e.code,this.listeningBinding=null,this.renderBindings(),this.handlers.onSettingsChange({keyBindings:Ot(this.settings.keyBindings),skinDataUrl:this.settings.skinDataUrl,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language})}renderBindings(){$s.forEach(e=>{["primary","secondary"].forEach(t=>{const i=this.bindingButtons.get(`${e}:${t}`);if(!i)return;const s=this.settings.keyBindings[e][t],r=this.listeningBinding?.action===e&&this.listeningBinding.slot===t;i.textContent=r?this.t("pressKey"):Fd(s,this.settings.language),i.classList.toggle("listening",r)})})}buildStatsRows(e){return e.map(([t,i])=>{const s=document.createElement("div");s.className="stats-line-row";const r=document.createElement("span");r.className="stats-line-label",r.textContent=t;const a=document.createElement("strong");return a.className="stats-line-value",a.textContent=i,s.append(r,a),s})}buildDefinitionListEntries(e){const t=[];return e.forEach(([i,s])=>{const r=document.createElement("dt");r.textContent=i;const a=document.createElement("dd");a.textContent=s,t.push(r,a)}),t}getWorldPreviewUrl(e){if(e.previewImageDataUrl&&e.previewImageDataUrl.length>1200)return e.previewImageDataUrl;const t=`${e.id}:${e.seed}:${e.createdAt}`,i=this.worldPreviewCache.get(t);if(i)return i;const s=document.createElement("canvas");s.width=192,s.height=108;const r=s.getContext("2d");if(!r)return"";const a=this.createSeededRandom(`${e.seed}|${e.name}|${e.createdAt}`),o=r.createLinearGradient(0,0,0,s.height);o.addColorStop(0,"#79aef5"),o.addColorStop(.6,"#a4cbff"),o.addColorStop(1,"#d7ecff"),r.fillStyle=o,r.fillRect(0,0,s.width,s.height),r.fillStyle="#fff8c2",r.fillRect(18,14,14,14),this.drawMountainRange(r,s.width,s.height,a,"#627c96",.46,20,9),this.drawMountainRange(r,s.width,s.height,a,"#46627f",.58,26,12),this.drawMountainRange(r,s.width,s.height,a,"#35556b",.72,32,16);const l=Math.floor(s.height*.68);r.fillStyle="#5a452d",r.fillRect(0,l,s.width,s.height-l),r.fillStyle="#4f8d3d",r.fillRect(0,l,s.width,8);for(let d=0;d<7;d+=1){const h=Math.floor(a()*(s.width-26)),u=16+Math.floor(a()*18);r.fillStyle="#3e2e1f",r.fillRect(h+7,l-u,6,u),r.fillStyle="#2f6a2c",r.fillRect(h,l-u-14,20,14)}for(let d=0;d<28;d+=1){const h=Math.floor(a()*s.width),u=l+10+Math.floor(a()*22);r.fillStyle=a()>.5?"#75604d":"#6a5544",r.fillRect(h,u,6,6)}const c=s.toDataURL("image/png");return this.worldPreviewCache.set(t,c),c}drawMountainRange(e,t,i,s,r,a,o,l){e.beginPath(),e.moveTo(0,i),e.lineTo(0,Math.floor(i*a));let c=0;for(;c<t+o;){const d=Math.floor(i*(a-.18+s()*.12)),h=o+Math.floor(s()*l);e.lineTo(c,d),c+=h}e.lineTo(t,i),e.closePath(),e.fillStyle=r,e.fill()}createSeededRandom(e){let t=2166136261;for(let s=0;s<e.length;s+=1)t^=e.charCodeAt(s),t=Math.imul(t,16777619);let i=t>>>0;return()=>{i+=1831565813;let s=i;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}formatDate(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return e;const i=this.settings.language==="fr"?"fr-FR":"en-US";return new Intl.DateTimeFormat(i,{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(t)}formatDuration(e){const t=Math.max(0,Math.floor(e/1e3)),i=Math.floor(t/3600),s=Math.floor(t%3600/60),r=t%60;return i>0?`${i}h ${s}m`:s>0?`${s}m ${r}s`:`${r}s`}}class TA{static cast(e,t,i,s){let r=Math.floor(t.x),a=Math.floor(t.y),o=Math.floor(t.z);const l=i.x>0?1:i.x<0?-1:0,c=i.y>0?1:i.y<0?-1:0,d=i.z>0?1:i.z<0?-1:0,h=l===0?Number.POSITIVE_INFINITY:Math.abs(1/i.x),u=c===0?Number.POSITIVE_INFINITY:Math.abs(1/i.y),p=d===0?Number.POSITIVE_INFINITY:Math.abs(1/i.z),g=T=>T-Math.floor(T);let v=l>0?(1-g(t.x))*h:l<0?g(t.x)*h:Number.POSITIVE_INFINITY,m=c>0?(1-g(t.y))*u:c<0?g(t.y)*u:Number.POSITIVE_INFINITY,f=d>0?(1-g(t.z))*p:d<0?g(t.z)*p:Number.POSITIVE_INFINITY,M=0,w=0,b=0,C=0;for(;M<=s;){const T=e.getBlock(r,a,o);if(T!==0)return{blockWorldX:r,blockWorldY:a,blockWorldZ:o,placeWorldX:r+w,placeWorldY:a+b,placeWorldZ:o+C,normalX:w,normalY:b,normalZ:C,blockId:T,distance:M};v<m&&v<f?(r+=l,M=v,v+=h,w=-l,b=0,C=0):m<f?(a+=c,M=m,m+=u,w=0,b=-c,C=0):(o+=d,M=f,f+=p,w=0,b=0,C=-d)}return null}}class Vn{key;coord;blocks;baseBlocks;dirty=!0;revision=0;constructor(e,t,i){this.coord=e,this.blocks=t,this.baseBlocks=i||t.slice(),this.key=Ct(e)}static getIndex(e,t,i){return e+i*Ge.chunkSizeX+t*Ge.chunkSizeX*Ge.chunkSizeZ}getBlock(e,t,i){return this.blocks[Vn.getIndex(e,t,i)]}setBlock(e,t,i,s){const r=Vn.getIndex(e,t,i);return this.blocks[r]===s?!1:(this.blocks[r]=s,this.dirty=!0,this.revision+=1,!0)}}class RA{chunks=new Map;set(e){this.chunks.set(e.key,e)}get(e){return this.chunks.get(e)}delete(e){return this.chunks.delete(e)}has(e){return this.chunks.has(e)}values(){return this.chunks.values()}entries(){return this.chunks.entries()}get size(){return this.chunks.size}clear(){this.chunks.clear()}}const Gs=(n,e,t)=>{let i=n^e*374761393^t*668265263;return i=(i^i>>>13)*1274126177,i^=i>>>16,(i>>>0)/4294967295},Bt=n=>{let e=2166136261;for(let t=0;t<n.length;t+=1)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0};class nn{constructor(e){this.seed=e}sample(e,t){const i=Math.floor(e),s=Math.floor(t),r=i+1,a=s+1,o=Hl(0,1,e-i),l=Hl(0,1,t-s),c=Gs(this.seed,i,s),d=Gs(this.seed,r,s),h=Gs(this.seed,i,a),u=Gs(this.seed,r,a),p=jr(c,d,o),g=jr(h,u,o);return jr(p,g,l)*2-1}fractal(e,t,i,s,r){let a=1,o=0,l=0,c=s;for(let d=0;d<i;d+=1)l+=this.sample(e*c,t*c)*a,o+=a,a*=r,c*=2;return o===0?0:l/o}}const CA=.986,bc=(n,e,t)=>{let i=n^Math.imul(e,73428767)^Math.imul(t,912931);return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967295};class PA{constructor(e){this.worldSeed=e}seed=Bt("tree");shouldSpawnTree(e,t){const i=Bt(this.worldSeed)^this.seed;return bc(i,e,t)>CA}getTreeHeight(e,t){const i=Bt(this.worldSeed)^this.seed<<1;return 4+Math.floor(bc(i,e,t)*3)}applyTrees(e,t,i,s,r){const a=Bi(t),o=Fi(t);for(let l=a-2;l<a+Ge.chunkSizeX+2;l+=1)for(let c=o-2;c<o+Ge.chunkSizeZ+2;c+=1){if(!this.shouldSpawnTree(l,c))continue;const d=i(l,c);if(d<1||d>=Ge.chunkSizeY-8||!r(l,c,d)||s(l,d,c)!==1)continue;const h=this.getTreeHeight(l,c);this.placeTrunk(e,t,l,c,d,h),this.placeLeaves(e,t,l,c,d+h,h)}}placeTrunk(e,t,i,s,r,a){for(let o=1;o<=a;o+=1)this.setIfInsideChunk(e,t,i,r+o,s,4)}placeLeaves(e,t,i,s,r,a){const l=r+1;for(let c=r-1;c<=l;c+=1)for(let d=i-2;d<=i+2;d+=1)for(let h=s-2;h<=s+2;h+=1){const u=Math.abs(d-i),p=Math.abs(h-s),g=c-r,v=u===2&&p===2,m=g===1&&u+p>2;v||m||this.setIfInsideChunk(e,t,d,c,h,5)}a>=6&&this.setIfInsideChunk(e,t,i,l+1,s,5)}setIfInsideChunk(e,t,i,s,r,a){if(s<0||s>=Ge.chunkSizeY)return;const o=i-Bi(t),l=r-Fi(t);if(o<0||o>=Ge.chunkSizeX||l<0||l>=Ge.chunkSizeZ)return;const c=Vn.getIndex(o,s,l);e[c]===0&&(e[c]=a)}}class IA{continentalNoise;hillNoise;detailNoise;peakMaskNoise;peakRidgeNoise;stonePatchNoise;riverNoiseA;riverNoiseB;riverWarpNoise;coverNoise;sedimentNoise;treeGenerator;columnCache=new Map;constructor(e){this.continentalNoise=new nn(Bt(`${e}:continental`)),this.hillNoise=new nn(Bt(`${e}:hills`)),this.detailNoise=new nn(Bt(`${e}:detail`)),this.peakMaskNoise=new nn(Bt(`${e}:peak-mask`)),this.peakRidgeNoise=new nn(Bt(`${e}:peak-ridge`)),this.stonePatchNoise=new nn(Bt(`${e}:stone-patch`)),this.riverNoiseA=new nn(Bt(`${e}:river-a`)),this.riverNoiseB=new nn(Bt(`${e}:river-b`)),this.riverWarpNoise=new nn(Bt(`${e}:river-warp`)),this.coverNoise=new nn(Bt(`${e}:cover`)),this.sedimentNoise=new nn(Bt(`${e}:sediment`)),this.treeGenerator=new PA(e)}getSurfaceHeight(e,t){return this.sampleColumn(e,t).surfaceHeight}getTerrainBlock(e,t,i){if(t<=0)return 6;const s=this.sampleColumn(e,i);if(t>s.surfaceHeight)return t<=s.waterLevel&&s.riverStrength>.04?10:0;const r=this.getDirtDepth(s),a=s.riverStrength>.04&&s.surfaceHeight<=s.waterLevel;return t===s.surfaceHeight?a?this.sedimentToBlock(s.sediment):s.rockySurface?3:1:t>=s.surfaceHeight-r?a&&t>=s.surfaceHeight-Math.max(1,r-1)&&s.sediment==="mud"?13:2:3}generateChunk(e){const t=new Uint8Array(Ge.chunkSizeX*Ge.chunkSizeY*Ge.chunkSizeZ),i=Bi(e),s=Fi(e);for(let r=0;r<Ge.chunkSizeX;r+=1)for(let a=0;a<Ge.chunkSizeZ;a+=1){const o=i+r,l=s+a,c=this.sampleColumn(o,l),d=Math.min(Ge.chunkSizeY-1,Math.max(c.surfaceHeight,c.waterLevel));for(let h=0;h<=d;h+=1){const u=this.getTerrainBlock(o,h,l);u!==0&&(t[Vn.getIndex(r,h,a)]=u)}}return this.treeGenerator.applyTrees(t,e,this.getSurfaceHeight.bind(this),this.getTerrainBlock.bind(this),(r,a,o)=>this.canSpawnTreeAt(r,a,o)),this.applyGroundCover(t,e),new Vn(e,t)}findSpawnPoint(){for(let e=0;e<=14;e+=1)for(let t=-e;t<=e;t+=1)for(let i=-e;i<=e;i+=1){const s=this.sampleColumn(t,i);if(s.surfaceHeight<Ge.chunkSizeY-8&&s.riverStrength<.06&&s.slope<=1.2)return[t+.5,s.surfaceHeight+1,i+.5]}return[.5,40,.5]}canSpawnTreeAt(e,t,i){const s=this.sampleColumn(e,t);return s.surfaceHeight!==i?!1:s.biome!=="peaks"&&s.riverStrength<.08&&!s.rockySurface&&s.slope<1.9}applyGroundCover(e,t){const i=Bi(t),s=Fi(t);for(let r=0;r<Ge.chunkSizeX;r+=1)for(let a=0;a<Ge.chunkSizeZ;a+=1){const o=i+r,l=s+a,c=this.sampleColumn(o,l),d=c.surfaceHeight;if(d<2||d>=Ge.chunkSizeY-2||c.riverStrength>.09||c.rockySurface||c.biome==="peaks"||this.getTerrainBlock(o,d,l)!==1)continue;const h=this.coverNoise.fractal(o,l,2,.16,.5);if(h<.48)continue;const u=d+1,p=Vn.getIndex(r,u,a);e[p]===0&&(e[p]=h>.82?15:14)}}getDirtDepth(e){return e.rockySurface?1:e.biome==="rolling"?3:e.slope<.9?4:3}sedimentToBlock(e){switch(e){case"sand":return 11;case"clay":return 12;case"mud":return 13;default:return 2}}sampleColumn(e,t){const i=`${e},${t}`,s=this.columnCache.get(i);if(s)return s;const r=this.sampleRiver(e,t),a=this.sampleBaseHeight(e,t),o=ln(Math.round(a-r.depth),4,Ge.chunkSizeY-8),l=this.estimateSlope(e,t,o),c=this.hillNoise.fractal(e,t,3,.0095,.56),d=ln((this.peakMaskNoise.fractal(e,t,3,.0025,.54)-.46)/.4,0,1),h=1-Math.abs(this.peakRidgeNoise.fractal(e,t,4,.0085,.56)),u=d*Math.pow(ln((h-.57)/.43,0,1),1.5),p=this.stonePatchNoise.fractal(e,t,2,.03,.5);let g="plains";r.strength>.11&&o<=r.waterLevel+1?g="river":u>.24?g="peaks":(c>.2||l>1.2)&&(g="rolling");const v=g==="peaks"||o>=56||l>=2.4||l>=1.9&&p>.26||p>.81,m=this.sedimentNoise.fractal(e,t,2,.02,.52),f=m>.36?"clay":m<-.36?"mud":r.widthNoise>.62?"sand":"dirt",M={surfaceHeight:o,biome:g,rockySurface:v,slope:l,riverStrength:r.strength,riverDepth:r.depth,waterLevel:r.waterLevel,sediment:f};return this.columnCache.size>16384&&this.columnCache.clear(),this.columnCache.set(i,M),M}sampleBaseHeight(e,t){const i=this.continentalNoise.fractal(e,t,3,.0038,.56)*3.8,s=this.hillNoise.fractal(e,t,4,.0115,.55)*5.9,r=this.detailNoise.fractal(e,t,2,.04,.5)*1.4,a=ln((this.peakMaskNoise.fractal(e,t,3,.0025,.54)-.48)/.38,0,1),o=1-Math.abs(this.peakRidgeNoise.fractal(e,t,4,.0085,.56)),l=Math.pow(ln((o-.58)/.42,0,1),1.8),c=a*(6+l*18);return 30+i+s+r+c}sampleRiver(e,t){const i=this.riverWarpNoise.fractal(e,t,2,.0035,.55)*18,s=e+i,r=t-i*.72,a=Math.abs(this.riverNoiseA.fractal(s,r,3,.0047,.56)),o=Math.abs(this.riverNoiseB.fractal(s*1.21,r*1.21,2,.0088,.53)),l=Math.min(a,o*.82+.055),c=ln((this.riverNoiseB.fractal(e-340,t+410,2,.0029,.5)+1)*.5,0,1),d=.046+c*.1,h=ln((d-l)/d,0,1),u=ln((this.detailNoise.fractal(e+820,t-700,2,.01,.55)+1)*.5,0,1),p=1.6+(1-c)*2.8+u*1.8,g=Math.pow(h,1.45)*p,v=30+Math.round(this.continentalNoise.fractal(e+1200,t-1200,2,.0018,.5)*2);return{strength:h,depth:g,widthNoise:c,waterLevel:v}}estimateSlope(e,t,i){const s=Math.abs(this.sampleBaseHeight(e+1,t)-i),r=Math.abs(this.sampleBaseHeight(e-1,t)-i),a=Math.abs(this.sampleBaseHeight(e,t+1)-i),o=Math.abs(this.sampleBaseHeight(e,t-1)-i);return Math.max(s,r,a,o)}}class Sc{constructor(e,t){if(this.seed=e,this.generator=new IA(e),t)for(const[i,s]of t.entries())this.chunkDiffs.set(i,new Map(s.changes.map(r=>[r.index,r.blockId])))}generator;chunkStore=new RA;queuedKeys=new Set;generationQueue=[];meshDirtyKeys=new Set;meshQueue=[];removedKeys=new Set;chunkDiffs=new Map;diffDirtyKeys=new Set;getChunkCount(){return this.chunkStore.size}hasPendingGeneration(){return this.generationQueue.length>0}hasPendingMeshes(){return this.meshQueue.length>0}getPlayerChunkCoord(e,t){return Jr(Math.floor(e),Math.floor(t))}enqueueStreamingAround(e,t){const i=this.getPlayerChunkCoord(e,t),s=new Set,r=[];for(let o=i.x-Ge.preloadRadius;o<=i.x+Ge.preloadRadius;o+=1)for(let l=i.z-Ge.preloadRadius;l<=i.z+Ge.preloadRadius;l+=1){const c={x:o,z:l},d=Ct(c);s.add(d),!this.chunkStore.has(d)&&!this.queuedKeys.has(d)&&r.push({coord:c,distance:Zg(o,l,i.x,i.z)})}const a=this.generationQueue.filter(o=>{const l=Ct(o);return s.has(l)&&!this.chunkStore.has(l)});this.generationQueue.length=0,this.generationQueue.push(...a),this.queuedKeys.clear(),a.forEach(o=>{this.queuedKeys.add(Ct(o))}),r.sort((o,l)=>o.distance-l.distance).forEach(({coord:o})=>{this.generationQueue.push(o),this.queuedKeys.add(Ct(o))});for(const[o,l]of this.chunkStore.entries())s.has(o)||(this.chunkStore.delete(o),this.removedKeys.add(o),this.markNeighborsDirty(l.coord))}processGenerationBudget(e=Ge.generationBudgetPerFrame){for(let t=0;t<e;t+=1){const i=this.generationQueue.shift();if(!i)return;const s=Ct(i);this.queuedKeys.delete(s),!this.chunkStore.has(s)&&(this.chunkStore.set(this.createChunk(i)),this.queueMeshUpdate(s),this.markNeighborsDirty(i))}}primeAround(e,t,i=2){const s=this.getPlayerChunkCoord(e,t);for(let r=s.x-i;r<=s.x+i;r+=1)for(let a=s.z-i;a<=s.z+i;a+=1){const o={x:r,z:a},l=Ct(o);this.chunkStore.has(l)||(this.chunkStore.set(this.createChunk(o)),this.queueMeshUpdate(l))}}getBlock(e,t,i){if(t<0||t>=Ge.chunkSizeY)return 0;const s=Jr(e,i),r=this.chunkStore.get(Ct(s));if(!r)return 0;const a=$l(e,t,i);return r.getBlock(a.x,a.y,a.z)}setBlock(e,t,i,s){if(t<0||t>=Ge.chunkSizeY)return!1;const r=Jr(e,i),a=this.chunkStore.get(Ct(r));if(!a)return!1;const o=$l(e,t,i);if(!a.setBlock(o.x,o.y,o.z,s))return!1;const c=Vn.getIndex(o.x,o.y,o.z),d=this.chunkDiffs.get(a.key)??new Map;return a.baseBlocks[c]===s?d.delete(c):d.set(c,s),d.size===0?this.chunkDiffs.delete(a.key):this.chunkDiffs.set(a.key,d),this.queueMeshUpdate(a.key),this.diffDirtyKeys.add(a.key),this.markBoundaryNeighborsDirty(r,o.x,o.z),!0}getTopSolidBlockY(e,t){return this.generator.getSurfaceHeight(e,t)}getChunkByKey(e){return this.chunkStore.get(e)}getChunkOrigin(e){const t=n_(e);return{x:Bi(t),z:Fi(t)}}drainMeshUpdates(e=Ge.meshBudgetPerFrame){const t=[];for(let i=0;i<e;i+=1){const s=this.meshQueue.shift();if(!s)break;this.meshDirtyKeys.delete(s);const r=this.chunkStore.get(s);r&&t.push(r)}return t}drainRemovedChunkKeys(){const e=[...this.removedKeys];return this.removedKeys.clear(),e}drainDirtyDiffs(){const e=[];for(const t of this.diffDirtyKeys)e.push(this.getChunkDiffRecord(t));return this.diffDirtyKeys.clear(),e}getAllDiffRecords(){return[...this.chunkDiffs.keys()].map(e=>this.getChunkDiffRecord(e))}createChunk(e){const t=Ct(e),i=this.generator.generateChunk(e),s=this.chunkDiffs.get(t);if(s)for(const[r,a]of s.entries())i.blocks[r]=a;return i}getChunkDiffRecord(e){const i=this.chunkStore.get(e)?.revision??0,r=[...(this.chunkDiffs.get(e)??new Map).entries()].sort((a,o)=>a[0]-o[0]).map(([a,o])=>({index:a,blockId:o}));return{chunkKey:e,changes:r,revision:i}}markNeighborsDirty(e){const t=[{x:e.x+1,z:e.z},{x:e.x-1,z:e.z},{x:e.x,z:e.z+1},{x:e.x,z:e.z-1}];for(const i of t){const s=Ct(i);this.chunkStore.has(s)&&this.queueMeshUpdate(s)}}markBoundaryNeighborsDirty(e,t,i){t===0&&this.queueMeshUpdate(Ct({x:e.x-1,z:e.z})),t===Ge.chunkSizeX-1&&this.queueMeshUpdate(Ct({x:e.x+1,z:e.z})),i===0&&this.queueMeshUpdate(Ct({x:e.x,z:e.z-1})),i===Ge.chunkSizeZ-1&&this.queueMeshUpdate(Ct({x:e.x,z:e.z+1}))}queueMeshUpdate(e){this.meshDirtyKeys.has(e)||(this.meshDirtyKeys.add(e),this.meshQueue.push(e))}}const la={blockId:null,count:0},Ec=120,Mc=0,LA=new URL("/assets/menu-Bu8EUnNp.mp3",import.meta.url).href,DA=4600,kA=3e3,NA=16,Hs=256;class UA{constructor(e){this.root=e,this.shell.className="mineblow-shell",this.canvas.className="mineblow-canvas",this.canvas.style.visibility="hidden",this.entryGate.className="entry-gate",this.entryGateButton.type="button",this.entryGateButton.className="entry-gate-button",this.entryGateButton.textContent="Cliquez pour acceder a Mineblow",this.entryGateButton.disabled=!0,this.introSplash.className="intro-splash",this.introSplashLabel.className="intro-splash-label",this.introSplashLabel.textContent="made by teddyfresnes",this.introSplashLoader.className="intro-splash-loader",this.introSplashLoader.setAttribute("aria-hidden","true"),this.introSplash.append(this.introSplashLabel,this.introSplashLoader),this.shell.append(this.canvas);const t=document.createElement("div");t.className="entry-gate-body",t.append(this.entryGateButton),this.entryGate.append(t),this.shell.append(this.entryGate,this.introSplash),this.root.append(this.shell),this.menuMusic.loop=!0,this.menuMusic.volume=.42,this.handleMenuMusicUnlock=this.handleMenuMusicUnlock.bind(this),this.handleEntryGateClick=this.handleEntryGateClick.bind(this),this.entryGateButton.addEventListener("click",this.handleEntryGateClick),this.renderer=new C_(this.canvas),this.renderer.setFirstPersonHandVisible(!1),this.input=new Wd(this.canvas),this.hud=new j_(this.shell),this.debugOverlay=new K_(this.shell),this.inventoryScreen=new tA(this.shell,{onClose:()=>{this.closeInventory()},onSlotInteract:i=>{this.handleInventorySlotInteract(i)},onRecipeCraft:i=>{this.handleCraftRecipe(i)},onSkinChange:i=>{this.applySettings({keyBindings:Ot(this.settings.keyBindings),skinDataUrl:i,startFullscreen:this.settings.startFullscreen,interfaceSize:this.settings.interfaceSize,language:this.settings.language})}}),this.menu=new wA(this.shell,{onPlayWorld:i=>{this.loadWorld(i)},onCreateWorld:(i,s)=>{this.startNewWorld(i,s)},onRenameWorld:(i,s)=>{this.renameWorld(i,s)},onDeleteWorld:i=>{this.deleteWorld(i)},onResume:()=>{this.resumeSession()},onQuitToTitle:()=>{this.quitToTitle()},onSettingsChange:i=>{this.applySettings(i)}}),this.gameLoop=new Vd(1/60,i=>this.update(i),()=>this.render()),this.handleResize=this.handleResize.bind(this),this.handleBeforeUnload=this.handleBeforeUnload.bind(this),this.handlePointerLockChange=this.handlePointerLockChange.bind(this),mr(this.settings.language),this.hud.setLanguage(this.settings.language),this.inventoryScreen.setLanguage(this.settings.language)}shell=document.createElement("div");canvas=document.createElement("canvas");entryGate=document.createElement("div");entryGateButton=document.createElement("button");introSplash=document.createElement("div");introSplashLabel=document.createElement("div");introSplashLoader=document.createElement("div");renderer;input;menu;hud;debugOverlay;inventoryScreen;saveRepository=new Y_;gameLoop;menuMusic=new Audio(LA);persistDirtyChunks=q_(()=>{this.saveDirtyChunks()},pt.worldSaveDebounceMs);session=null;settings=Zs();globalStats=sr();miningTargetKey=null;miningProgressMs=0;targetHit=null;savePlayerElapsedMs=0;statsPanelRefreshElapsedMs=0;fpsFrames=0;fpsElapsedMs=0;fpsValue=0;lastRenderTime=performance.now();inventoryMode="player";inventoryCursor={...la};movementIntensity=0;primaryHoldMs=0;primaryPunchPending=!1;primaryPunchLockMs=0;wasPrimaryDown=!1;dropSequence=0;menuMusicUnlockRegistered=!1;entryGateReady=!1;entryGateActivated=!1;entryGateDelayElapsed=!1;entryGateDismissed=!1;introSplashTimeoutId=null;entryGateDelayTimeoutId=null;pendingWorldPreviewCapture=null;droppedItems=new Map;async bootstrap(){this.input.connect(),this.input.setPointerLockListener(this.handlePointerLockChange),this.hud.setVisible(!1),this.updateCanvasVisibility(),this.handleResize(),window.addEventListener("resize",this.handleResize),window.addEventListener("beforeunload",this.handleBeforeUnload);const[e,t,i]=await Promise.all([this.saveRepository.loadSettings(),this.saveRepository.loadGlobalStats(),this.saveRepository.listWorlds()]);this.settings=e,mr(this.settings.language),this.applyInterfaceZoom(this.settings.interfaceSize),this.globalStats=t,this.menu.setSettings(e),this.menu.setGlobalStats(t),this.menu.setWorlds(i),this.hud.setHandSkin(e.skinDataUrl),this.hud.setLanguage(this.settings.language),this.inventoryScreen.setLanguage(this.settings.language),this.entryGateReady=!0,this.entryGateButton.disabled=!1,this.entryGateActivated&&this.finishEntryGate(),this.gameLoop.start()}async refreshMenuWorlds(e){const t=await this.saveRepository.listWorlds();this.menu.setWorlds(t),e!==void 0&&this.menu.setSelectedWorld(e)}async renameWorld(e,t){const i=await this.saveRepository.renameWorld(e,t);await this.refreshMenuWorlds(i?.id??e),this.session&&this.session.id===e&&i&&(this.session.name=i.name,this.updatePauseMenuSnapshot())}async deleteWorld(e){await this.saveRepository.deleteWorld(e),await this.refreshMenuWorlds()}updatePauseMenuSnapshot(){if(!this.session){this.menu.setPauseWorld(null);return}this.menu.setPauseWorld({id:this.session.id,name:this.session.name,seed:this.session.seed,worldStats:this.session.worldStats})}async quitToTitle(){this.session&&await this.flushSaves(),this.session=null,this.pendingWorldPreviewCapture=null,this.input.exitPointerLock(),this.inventoryScreen.setVisible(!1),this.inventoryCursor={...la},this.targetHit=null,this.miningTargetKey=null,this.miningProgressMs=0,this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.dropSequence=0,this.droppedItems.clear(),this.renderer.clearChunks(),this.renderer.clearDroppedItems(),this.renderer.setFirstPersonHandVisible(!1),this.renderer.setMiningOverlay(null,0),this.hud.setMiningProgress(0),this.hud.setVisible(!1),this.menu.setGlobalStats(this.globalStats),this.menu.setPauseWorld(null),this.updateCanvasVisibility(),await this.refreshMenuWorlds(),this.menu.showBoot(),this.playMenuMusic()}async startNewWorld(e,t){const i=t||`mineblow-${Date.now().toString(36)}`;this.renderer.clearChunks();const s=new Sc(i);s.primeAround(0,0,1);const r=jl.resolve(s),a={position:[...r],velocity:[0,0,0],yaw:0,pitch:0,selectedSlot:0,spawnPoint:[...r]},o=new Wo,l=lo(),c=await this.saveRepository.createNewWorld(e,i,a,o.snapshot(),l);this.globalStats=await this.saveRepository.loadGlobalStats(),this.menu.setGlobalStats(this.globalStats),await this.refreshMenuWorlds(c.id),await this.activateSession({id:c.id,name:c.name,seed:i,world:s,player:new Kl(a),inventory:o,worldStats:l})}async loadWorld(e){const t=await this.saveRepository.loadWorld(e);if(!t){await this.refreshMenuWorlds(),this.menu.showBoot();return}this.renderer.clearChunks(),await this.activateLoadedWorld(t)}async activateLoadedWorld(e){const t=new Sc(e.save.seed,e.chunkDiffs);t.primeAround(e.save.player.position[0],e.save.player.position[2],1),t.primeAround(0,0,1);const i=this.createSafePlayerState(e.save.player,t),s=new Wo(e.save.inventory,i.selectedSlot),r=this.normalizeWorldStats(e.save.worldStats);await this.refreshMenuWorlds(e.save.id),await this.activateSession({id:e.save.id,name:e.save.name,seed:e.save.seed,world:t,player:new Kl(i),inventory:s,worldStats:r})}async activateSession(e){this.session=e,this.updateCanvasVisibility(),this.stopMenuMusic(),this.savePlayerElapsedMs=0,this.statsPanelRefreshElapsedMs=0,this.miningTargetKey=null,this.miningProgressMs=0,this.targetHit=null,this.inventoryCursor={...la},this.movementIntensity=0,this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.dropSequence=0,this.droppedItems.clear(),this.renderer.clearDroppedItems(),this.renderer.setMiningOverlay(null,0),this.inventoryScreen.setVisible(!1),this.hud.setMiningProgress(0),this.hud.setHealth(20,20),this.updateLevelHud();const[t,,i]=e.player.getPosition();e.world.enqueueStreamingAround(t,i),this.syncChunkMeshes(),this.hud.setVisible(!0),this.hud.setHandSkin(this.settings.skinDataUrl),this.renderer.setPlayerSkin(this.settings.skinDataUrl),this.menu.setPauseWorld({id:e.id,name:e.name,seed:e.seed,worldStats:e.worldStats}),this.updateFirstPersonHandVisibility(e.inventory),this.hud.updateHotbar(e.inventory.getHotbarSlots(),e.inventory.getSelectedHotbarIndex()),this.hud.setGenerating(e.world.hasPendingGeneration()||e.world.hasPendingMeshes()),this.queueWorldPreviewCapture(e.id),await this.resumeSession()}async resumeSession(){this.hud.setVisible(!0),this.menu.hide();try{await this.input.requestPointerLock()}catch{this.updatePauseMenuSnapshot(),this.menu.showPause()}}update(e){this.input.consumeAnyJustPressed([this.settings.keyBindings.debug.primary,this.settings.keyBindings.debug.secondary,"F3"])&&this.debugOverlay.toggle(),this.input.consumeAnyJustPressed([this.settings.keyBindings.inventory.primary,this.settings.keyBindings.inventory.secondary,"KeyI"])&&(this.inventoryScreen.isVisible()?this.closeInventory():this.session&&!this.menu.isVisible()&&this.openInventory("player"));const s=this.input.consumeAnyJustPressed([this.settings.keyBindings.pause.primary,this.settings.keyBindings.pause.secondary,"Escape"]);if(this.inventoryScreen.isVisible()&&s&&this.closeInventory(),!this.session){this.input.endFrame();return}const{world:r,player:a,inventory:o}=this.session;if(s&&this.input.isPointerLocked()&&!this.inventoryScreen.isVisible()&&!this.menu.isVisible()&&(this.input.exitPointerLock(),this.updatePauseMenuSnapshot(),this.menu.showPause(),this.hud.setVisible(!1)),!this.inventoryScreen.isVisible()){const u=this.input.consumeWheelSteps();u!==0&&(o.shiftSelectedHotbar(u),a.setSelectedSlot(o.getSelectedHotbarIndex()));const p=this.input.consumeNumberSlot();p!==null&&(o.setSelectedHotbarIndex(p),a.setSelectedSlot(o.getSelectedHotbarIndex()))}if(this.updateFirstPersonHandVisibility(o),this.input.isPointerLocked()&&!this.menu.isVisible()&&!this.inventoryScreen.isVisible()){this.primaryPunchLockMs=Math.max(0,this.primaryPunchLockMs-e*1e3);const u=this.input.isPrimaryDown();this.input.consumePrimaryClick()&&(u?(this.primaryPunchPending=!0,this.primaryHoldMs=0):(this.primaryPunchLockMs<=0&&(this.primaryPunchLockMs=Mc,this.renderer.triggerFirstPersonAction(1.55)),this.primaryPunchPending=!1,this.primaryHoldMs=0)),u&&this.primaryPunchPending&&(this.primaryHoldMs+=e*1e3);const g=a.getPosition(),v=a.update(e,this.input,r,this.settings.keyBindings);v.jumped&&this.renderer.triggerFirstPersonJump(.85);const m=a.getPosition();if(this.trackMovementStats(g,m,e,v),this.targetHit=TA.cast(r,a.getCameraPosition(),a.getLookDirection(),Ge.maxInteractionDistance),u&&this.primaryPunchPending&&this.primaryHoldMs>=Ec&&this.targetHit&&$r(this.targetHit.blockId)&&(this.primaryPunchPending=!1),!u&&this.wasPrimaryDown){const b=this.primaryPunchPending&&this.primaryPunchLockMs<=0;this.primaryPunchPending=!1,this.primaryHoldMs=0,b&&(this.primaryPunchLockMs=Mc,this.renderer.triggerFirstPersonAction(1.55))}const w=this.primaryPunchLockMs<=0&&u&&!this.primaryPunchPending&&this.primaryHoldMs>=Ec&&!!this.targetHit&&$r(this.targetHit.blockId);this.handleInteractions(e,w),this.wasPrimaryDown=u,this.updateDroppedItems(e),this.hud.updateHand(e,this.movementIntensity,this.miningProgressMs>0),this.renderer.updateHand(e,this.movementIntensity,this.miningProgressMs>0),this.renderer.updateSpeedFov(e,v.sprinting,v.moving,a.isGrounded())}else this.input.consumePrimaryClick(),this.primaryHoldMs=0,this.primaryPunchPending=!1,this.primaryPunchLockMs=0,this.wasPrimaryDown=!1,this.resetMining(),this.targetHit=null,this.renderer.setMiningOverlay(null,0),this.hud.setMiningProgress(0),this.hud.updateHand(e,0,!1),this.renderer.updateHand(e,0,!1),this.renderer.updateSpeedFov(e,!1,!1,!0);this.renderer.updateTransientEffects(e),r.enqueueStreamingAround(a.getPosition()[0],a.getPosition()[2]),r.processGenerationBudget(),this.syncChunkMeshes(),this.hud.updateHotbar(o.getHotbarSlots(),o.getSelectedHotbarIndex()),this.hud.setGenerating(r.hasPendingGeneration()||r.hasPendingMeshes()),this.hud.setFps(this.fpsValue),this.hud.setHealth(20,20),this.updateLevelHud(),this.inventoryScreen.isVisible()&&this.refreshInventoryScreen(),this.savePlayerElapsedMs+=e*1e3,this.savePlayerElapsedMs>=pt.playerSaveIntervalMs&&(this.savePlayerElapsedMs=0,this.persistProfile(!0)),this.statsPanelRefreshElapsedMs+=e*1e3,this.statsPanelRefreshElapsedMs>=500&&(this.statsPanelRefreshElapsedMs=0,this.menu.setGlobalStats(this.globalStats),this.updatePauseMenuSnapshot());const[c,d,h]=a.getPosition();this.updateDebugPanel(c,d,h),this.input.endFrame()}render(){if(!this.session){this.lastRenderTime=performance.now();return}if(this.session){const t=this.session.player.getCameraPosition(),i=this.session.player.getRotation();this.renderer.setCameraTransform(t,i.yaw,i.pitch)}const e=performance.now();this.fpsFrames+=1,this.fpsElapsedMs+=e-this.lastRenderTime,this.lastRenderTime=e,this.fpsElapsedMs>=500&&(this.fpsValue=Math.round(this.fpsFrames*1e3/this.fpsElapsedMs),this.fpsFrames=0,this.fpsElapsedMs=0),this.renderer.render(),this.capturePendingWorldPreview()}updateCanvasVisibility(){this.canvas.style.visibility=this.session?"visible":"hidden"}queueWorldPreviewCapture(e){this.pendingWorldPreviewCapture={worldId:e,framesRemaining:NA}}capturePendingWorldPreview(){const e=this.pendingWorldPreviewCapture;if(!e)return;if(!this.session||this.session.id!==e.worldId){this.pendingWorldPreviewCapture=null;return}if(e.framesRemaining>0){e.framesRemaining-=1;return}this.pendingWorldPreviewCapture=null;const t=this.captureWorldPreviewPng();t&&this.saveRepository.saveWorldPreview(e.worldId,t)}captureWorldPreviewPng(){const e=this.canvas.width,t=this.canvas.height;if(e<8||t<8)return null;const i=Math.min(e,t),s=Math.floor((e-i)*.5),r=Math.floor((t-i)*.5),a=document.createElement("canvas");a.width=Hs,a.height=Hs;const o=a.getContext("2d");return o?(o.imageSmoothingEnabled=!0,o.drawImage(this.canvas,s,r,i,i,0,0,Hs,Hs),a.toDataURL("image/png")):null}handleInteractions(e,t){if(!this.session)return;const{world:i,player:s,inventory:r}=this.session;if(t&&this.targetHit&&$r(this.targetHit.blockId)){const a=`${this.targetHit.blockWorldX},${this.targetHit.blockWorldY},${this.targetHit.blockWorldZ}`;this.miningTargetKey!==a&&(this.miningTargetKey=a,this.miningProgressMs=0),this.miningProgressMs+=e*1e3;const o=Qg(this.targetHit.blockId),l=Math.min(1,this.miningProgressMs/o);if(this.hud.setMiningProgress(l),this.renderer.setMiningOverlay(this.targetHit,l),this.miningProgressMs>=o){const c=this.targetHit.blockId;i.setBlock(this.targetHit.blockWorldX,this.targetHit.blockWorldY,this.targetHit.blockWorldZ,0)&&(this.spawnDroppedItem(c,this.targetHit.blockWorldX+.5,this.targetHit.blockWorldY+.5,this.targetHit.blockWorldZ+.5),this.renderer.spawnBreakParticles(Ii(c),this.targetHit.blockWorldX,this.targetHit.blockWorldY,this.targetHit.blockWorldZ),this.session.worldStats.blocksMined+=1,this.globalStats.totalBlocksMined+=1,this.persistDirtyChunks(),this.persistProfile(!0)),this.resetMining()}}else this.resetMining(),this.hud.setMiningProgress(0),this.renderer.setMiningOverlay(null,0);if(this.targetHit&&this.input.consumeSecondaryClick()){if(this.targetHit.blockId===8){this.openInventory("crafting_table");return}const a=r.getSelectedBlock();a!==null&&e_(a)&&i.getBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ)===0&&s.canOccupyBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ)&&i.setBlock(this.targetHit.placeWorldX,this.targetHit.placeWorldY,this.targetHit.placeWorldZ,a)&&(r.consumeSelectedBlock(),this.session.worldStats.blocksPlaced+=1,this.globalStats.totalBlocksPlaced+=1,this.persistDirtyChunks(),this.persistProfile(!0))}}openInventory(e){this.session&&(this.inventoryMode=e,this.inventoryScreen.setVisible(!0),this.hud.setVisible(!1),this.input.exitPointerLock(),this.refreshInventoryScreen())}async closeInventory(){if(this.session){if(this.inventoryCursor=this.session.inventory.returnCursor(this.inventoryCursor),this.inventoryCursor.blockId!==null&&this.inventoryCursor.count>0){this.refreshInventoryScreen();return}this.inventoryScreen.setVisible(!1),await this.persistProfile(!0),await this.resumeSession()}}refreshInventoryScreen(){if(!this.session)return;const e=Xo(this.inventoryMode),t=new Set(e.filter(s=>Rc(this.session.inventory,s)).map(s=>s.id)),i={mode:this.inventoryMode,slots:this.session.inventory.getSlots(),selectedHotbarIndex:this.session.inventory.getSelectedHotbarIndex(),cursor:{...this.inventoryCursor},recipes:e,craftableRecipeIds:t,skinDataUrl:this.settings.skinDataUrl};this.inventoryScreen.render(i)}handleInventorySlotInteract(e){if(!this.session||!this.inventoryScreen.isVisible())return;const t=this.session.inventory,i=e.index;if(e.shift&&this.inventoryCursor.blockId===null){this.transferStackBetweenSections(t,i)&&this.refreshInventoryScreen();return}const s=t.getSlot(i);if(e.button==="left")if(this.inventoryCursor.blockId===null||this.inventoryCursor.count===0){if(s.blockId===null||s.count===0)return;this.inventoryCursor=t.pickUpSlot(i)}else this.inventoryCursor=t.placeCursor(i,this.inventoryCursor);else this.inventoryCursor=this.handleRightClickInventory(t,i,s,this.inventoryCursor);this.refreshInventoryScreen()}handleCraftRecipe(e){if(!this.session||!this.inventoryScreen.isVisible())return;const t=Xo(this.inventoryMode).find(i=>i.id===e);t&&Hd(this.session.inventory,t)&&(this.session.worldStats.craftedItems+=t.output.count,this.globalStats.totalCraftedItems+=t.output.count,this.refreshInventoryScreen(),this.hud.updateHotbar(this.session.inventory.getHotbarSlots(),this.session.inventory.getSelectedHotbarIndex()),this.persistProfile(!0))}syncChunkMeshes(){if(this.session){for(const e of this.session.world.drainRemovedChunkKeys())this.renderer.removeChunkMesh(e);for(const e of this.session.world.drainMeshUpdates()){const t=Ti.buildGeometry(e,this.session.world,this.renderer.atlas);this.renderer.upsertChunkMesh(e.key,t,this.session.world.getChunkOrigin(e.key))}}}async saveDirtyChunks(){if(!this.session)return;const e=this.session.world.drainDirtyDiffs();e.length!==0&&await this.saveRepository.saveChunkDiffs(this.session.id,e)}resetMining(){this.miningTargetKey=null,this.miningProgressMs=0,this.hud.setMiningProgress(0)}updateDebugPanel(e,t,i){if(!this.session)return;const s=this.session.world.getPlayerChunkCoord(e,i);this.debugOverlay.update([`FPS: ${this.fpsValue}`,`POS: ${e.toFixed(2)}, ${t.toFixed(2)}, ${i.toFixed(2)}`,`CHUNK: ${s.x}, ${s.z}`,`LOADED: ${this.session.world.getChunkCount()}`,`STREAM: ${this.session.world.hasPendingGeneration()||this.session.world.hasPendingMeshes()?"busy":"steady"}`,`SEED: ${this.session.seed}`,`MODE: ${this.inventoryScreen.isVisible()?this.inventoryMode:"play"}`].join(`
`))}updateFirstPersonHandVisibility(e){const t=e.getSlot(e.getSelectedAbsoluteSlotIndex()),i=t.blockId===null||t.count<=0;this.renderer.setFirstPersonAnimationPreset(i?"hand":"item"),this.renderer.setFirstPersonHandVisible(i)}createSafePlayerState(e,t){const i=jl.resolve(t),s=this.canStandAt(t,e.spawnPoint)?e.spawnPoint:i;return{position:[...this.canStandAt(t,e.position)?e.position:s],velocity:[0,0,0],yaw:Number.isFinite(e.yaw)?e.yaw:0,pitch:Number.isFinite(e.pitch)?Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,e.pitch)):0,selectedSlot:Math.max(0,Math.min(8,e.selectedSlot|0)),spawnPoint:[...s]}}canStandAt(e,t){const[i,s,r]=t;if(!Number.isFinite(i)||!Number.isFinite(s)||!Number.isFinite(r)||s<1||s>Ge.chunkSizeY-2)return!1;const a=Math.floor(s),o=Math.floor(s+1),l=a-1,c=[[i,r],[i-.28,r-.28],[i+.28,r-.28],[i-.28,r+.28],[i+.28,r+.28]];return c.some(([h,u])=>Fn(e.getBlock(Math.floor(h),l,Math.floor(u))))?c.every(([h,u])=>{const p=Math.floor(h),g=Math.floor(u);return e.getBlock(p,a,g)===0&&e.getBlock(p,o,g)===0}):!1}handleResize(){this.renderer.resize(window.innerWidth,window.innerHeight)}handlePointerLockChange(e){if(this.session){if(e){this.menu.hide(),this.inventoryScreen.isVisible()||this.hud.setVisible(!0);return}this.inventoryScreen.isVisible()||this.menu.isVisible()||(this.menu.setGlobalStats(this.globalStats),this.updatePauseMenuSnapshot(),this.menu.showPause(),this.hud.setVisible(!1))}}handleBeforeUnload(){this.introSplashTimeoutId!==null&&(window.clearTimeout(this.introSplashTimeoutId),this.introSplashTimeoutId=null),this.entryGateDelayTimeoutId!==null&&(window.clearTimeout(this.entryGateDelayTimeoutId),this.entryGateDelayTimeoutId=null),this.stopMenuMusic(),this.flushSaves()}async flushSaves(){if(!this.session)return;await this.persistProfile(!0);const e=this.captureWorldPreviewPng();e&&await this.saveRepository.saveWorldPreview(this.session.id,e),await this.saveRepository.saveChunkDiffs(this.session.id,this.session.world.getAllDiffRecords())}spawnDroppedItem(e,t,i,s){const r=`drop-${++this.dropSequence}`,a=[(Math.random()-.5)*2.6,2.5+Math.random()*1.6,(Math.random()-.5)*2.6],o={id:r,blockId:e,position:[t,i,s],velocity:a,ageMs:0};this.droppedItems.set(r,o),this.renderer.spawnDroppedItem(r,Ii(e),t,i,s)}updateDroppedItems(e){if(!this.session||this.droppedItems.size===0)return;const{world:t,player:i,inventory:s}=this.session,r=i.getPosition(),a=1.9*1.9,o=5.5,l=o*o,c=18;for(const[d,h]of this.droppedItems.entries()){h.ageMs+=e*1e3;const u=t.getBlock(Math.floor(h.position[0]),Math.floor(h.position[1]),Math.floor(h.position[2])),p=ir(u);p?(h.velocity[0]*=.9,h.velocity[2]*=.9,h.velocity[1]-=3.5*e,h.velocity[1]<-1.4&&(h.velocity[1]=-1.4)):h.velocity[1]-=c*e,h.position[0]+=h.velocity[0]*e,h.position[1]+=h.velocity[1]*e,h.position[2]+=h.velocity[2]*e;const g=Math.floor(h.position[1]-.14),v=t.getBlock(Math.floor(h.position[0]),g,Math.floor(h.position[2]));Fn(v)&&h.velocity[1]<=0&&(h.position[1]=g+1+.14,h.velocity[1]=p?-.2:0,h.velocity[0]*=.72,h.velocity[2]*=.72);const m=r[0]-h.position[0],f=r[1]+.8-h.position[1],M=r[2]-h.position[2],w=m*m+f*f+M*M;if(h.ageMs>120&&w<l){const T=Math.max(1e-4,Math.sqrt(w)),P=Math.max(0,Math.min(1,(o-T)/o)),N=(p?5.6:11.5)*(.25+P*1.35),E=1/T;h.velocity[0]+=m*E*N*e,h.velocity[1]+=f*E*N*e*.58,h.velocity[2]+=M*E*N*e;const S=Math.hypot(h.velocity[0],h.velocity[2]),I=p?3.1:6.3;if(S>I){const B=I/S;h.velocity[0]*=B,h.velocity[2]*=B}}if(h.ageMs>180&&w<a&&s.addBlock(h.blockId)){this.droppedItems.delete(d),this.renderer.removeDroppedItem(d),this.hud.updateHotbar(s.getHotbarSlots(),s.getSelectedHotbarIndex());continue}if(h.ageMs>12e4){this.droppedItems.delete(d),this.renderer.removeDroppedItem(d);continue}const b=.08*Math.sin(h.ageMs*.008),C=h.ageMs*.0032;this.renderer.updateDroppedItem(d,h.position[0],h.position[1],h.position[2],C,b)}}trackMovementStats(e,t,i,s){if(!this.session)return;const r=t[0]-e[0],a=t[1]-e[1],o=t[2]-e[2],l=Math.hypot(r,a,o);this.movementIntensity=Math.max(0,Math.min(1.15,l/Math.max(1e-4,Le.sprintSpeed*i))),this.session.worldStats.distanceTravelled+=l,this.globalStats.totalDistanceTravelled+=l,this.session.worldStats.playTimeMs+=i*1e3,this.globalStats.totalPlayTimeMs+=i*1e3,s.jumped&&(this.session.worldStats.jumps+=1,this.globalStats.totalJumps+=1)}updateLevelHud(){if(!this.session)return;const e=28,t=Math.floor(this.session.worldStats.blocksMined/e)+1,i=this.session.worldStats.blocksMined%e/e;this.hud.setLevel(t,i)}async persistProfile(e){this.session&&(await this.saveRepository.savePlayer(this.session.id,this.session.player.getState(),this.session.inventory.snapshot(),this.session.worldStats),e&&await this.saveRepository.saveGlobalStats(this.globalStats))}applySettings(e){this.settings={keyBindings:Ot(e.keyBindings),skinDataUrl:e.skinDataUrl,startFullscreen:e.startFullscreen,interfaceSize:or(e.interfaceSize),language:e.language},mr(this.settings.language),this.applyInterfaceZoom(this.settings.interfaceSize),this.menu.setSettings(this.settings),this.hud.setHandSkin(this.settings.skinDataUrl),this.hud.setLanguage(this.settings.language),this.inventoryScreen.setLanguage(this.settings.language),this.renderer.setPlayerSkin(this.settings.skinDataUrl),this.saveRepository.saveSettings(this.settings),this.inventoryScreen.isVisible()&&this.refreshInventoryScreen()}applyInterfaceZoom(e){const t=Tc(e);this.root.style.setProperty("zoom",`${t}%`)}normalizeWorldStats(e){if(!e)return lo();const t=i=>Number.isFinite(i)?Number(i):0;return{blocksMined:t(e.blocksMined),blocksPlaced:t(e.blocksPlaced),distanceTravelled:t(e.distanceTravelled),playTimeMs:t(e.playTimeMs),jumps:t(e.jumps),craftedItems:t(e.craftedItems)}}handleRightClickInventory(e,t,i,s){if(s.blockId===null||s.count<=0){if(i.blockId===null||i.count<=0)return{blockId:null,count:0};const o=Math.ceil(i.count/2);return e.setSlot(t,{blockId:i.blockId,count:i.count-o}),i.count-o<=0&&e.setSlot(t,{blockId:null,count:0}),{blockId:i.blockId,count:o}}if(i.blockId===null||i.count<=0){e.setSlot(t,{blockId:s.blockId,count:1});const o=s.count-1;return o>0?{blockId:s.blockId,count:o}:{blockId:null,count:0}}if(i.blockId!==s.blockId||i.count>=$t)return s;e.setSlot(t,{blockId:i.blockId,count:Math.min($t,i.count+1)});const a=s.count-1;return a>0?{blockId:s.blockId,count:a}:{blockId:null,count:0}}transferStackBetweenSections(e,t){const i=e.getSlot(t);if(i.blockId===null||i.count<=0)return!1;const s=t<27?[27,35]:[0,26];let r=i.count;for(let a=s[0];a<=s[1];a+=1){const o=e.getSlot(a);if(o.blockId!==i.blockId||o.count>=$t)continue;const l=Math.min($t-o.count,r);if(e.setSlot(a,{blockId:o.blockId,count:o.count+l}),r-=l,r===0)break}for(let a=s[0];a<=s[1]&&r>0;a+=1){const o=e.getSlot(a);if(o.blockId!==null&&o.count>0)continue;const l=Math.min($t,r);e.setSlot(a,{blockId:i.blockId,count:l}),r-=l}return r===i.count?!1:(r<=0?e.setSlot(t,{blockId:null,count:0}):e.setSlot(t,{blockId:i.blockId,count:r}),!0)}async playMenuMusic(){if(this.menuMusic.paused)try{await this.menuMusic.play(),this.unregisterMenuMusicUnlock()}catch{this.registerMenuMusicUnlock()}}stopMenuMusic(){this.menuMusic.pause(),this.menuMusic.currentTime=0,this.unregisterMenuMusicUnlock()}registerMenuMusicUnlock(){this.menuMusicUnlockRegistered||(this.menuMusicUnlockRegistered=!0,window.addEventListener("pointerdown",this.handleMenuMusicUnlock),window.addEventListener("keydown",this.handleMenuMusicUnlock))}unregisterMenuMusicUnlock(){this.menuMusicUnlockRegistered&&(this.menuMusicUnlockRegistered=!1,window.removeEventListener("pointerdown",this.handleMenuMusicUnlock),window.removeEventListener("keydown",this.handleMenuMusicUnlock))}handleMenuMusicUnlock(){this.playMenuMusic()}handleEntryGateClick(){this.entryGateDismissed||this.entryGateActivated||(this.entryGateActivated=!0,this.entryGateDelayElapsed=!1,this.entryGateButton.disabled=!0,this.entryGateButton.textContent=this.entryGateReady?"Acces...":"Chargement...",this.settings.startFullscreen&&this.requestFullscreen(),this.showIntroSplash(),this.entryGateDelayTimeoutId!==null&&window.clearTimeout(this.entryGateDelayTimeoutId),this.entryGateDelayTimeoutId=window.setTimeout(()=>{this.entryGateDelayElapsed=!0,this.entryGateDelayTimeoutId=null,this.finishEntryGate()},kA),this.playMenuMusic(),this.finishEntryGate())}finishEntryGate(){!this.entryGateReady||this.entryGateDismissed||!this.entryGateActivated||!this.entryGateDelayElapsed||(this.entryGateDismissed=!0,this.entryGate.remove(),this.menu.showBoot())}showIntroSplash(){this.introSplash.classList.remove("active"),this.introSplash.offsetWidth,this.introSplash.classList.add("active"),this.introSplashTimeoutId!==null&&window.clearTimeout(this.introSplashTimeoutId),this.introSplashTimeoutId=window.setTimeout(()=>{this.introSplash.classList.remove("active"),this.introSplashTimeoutId=null},DA)}async requestFullscreen(){if(!document.fullscreenElement)try{await this.shell.requestFullscreen()}catch{}}}const Sd=document.querySelector("#app");if(!Sd)throw new Error("App root not found.");const OA=new UA(Sd);OA.bootstrap();
