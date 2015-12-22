/**
 * Created by alexr on 22.12.2015.
 */
var page = tabris.create("Page", {
    title: "CraftWorld",
    topLevel: true
});

var inventory = [],
    treasures = ['stone','stone','stone','iron','iron','gold'],
    lootTime = 100,
    lootInterval = null,
    checkInventory = function(){
        if(inventory.length >= 10){
            clearInterval(lootInterval);
            button.set('enabled',true);
            return false;
        }
        return true;
    },
    getLoot = function(){
        var loot = getRandomInt(0,5);
        nameTextView.set('text',loot);
        inventory.push(treasures[loot]);
        nameTextView.set('text',showInventory());
    },
    showInventory = function(){
        return inventory.join(', ');
    },
    getRandomInt = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

var nameTextView = tabris.create("TextView", {
    alignment: "center",
    layoutData: {top: 100}
}).appendTo(page);

var button = tabris.create("Button", {
    alignment: 'right',
    image: 'src/img/stone-crafting.png'
}).on("select", function() {
    this.set('enabled',false);
    lootInterval = setInterval(function() {
        if(checkInventory()){
            var selection = progressBar.get("selection") + 1;
            progressBar.set("selection", selection > lootTime ? 0 : selection);
            if(selection > lootTime){
                getLoot();
            }
        }
    }, 10);
}).appendTo(page);

var progressBar = tabris.create("ProgressBar", {
    layoutData: {left: 15, right: 15, centerY: 0},
    maximum: 100,
    selection: 0
}).appendTo(page);


page.open();