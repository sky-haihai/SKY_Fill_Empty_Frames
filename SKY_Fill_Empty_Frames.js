include("openHarmony.js");

function fillFrames() {
  $.beginUndo("fillFrame");

  var scene = $.scn;
  var selectedNodes = scene.selectedNodes;
  if (selectedNodes.length == 0) {
    $.alert("Please select at least one drawing node");
    return;
  }

  for (var j = 0; j < selectedNodes.length; j++) {
    var sNode= selectedNodes[j];
    if (sNode.type != "READ") {
      $.debug("Skipping node: " + sNode.type);
      continue;
    }

    var drawingAttr = sNode.attributes.drawing.element;

    for (var i = 0; i < scene.length; i++) {
      var drawing = sNode.getDrawingAtFrame(i + 1);
      if (!drawing.path) {
        drawingAttr.setValue("00", i + 1);
        $.debug("Adding 00 at Frame: " + (i + 1));
      } else {
        $.debug("Skipping Frame: " + (i + 1));
      }
    }

    $.log("Fill Finished");
    $.endUndo();
  }
}
