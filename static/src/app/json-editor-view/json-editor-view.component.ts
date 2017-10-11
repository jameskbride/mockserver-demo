import {Component, ViewChild} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';

@Component({
  selector: 'json-editor-view',
  template: '<json-editor [options]="editorOptions" [data]="data"></json-editor>',
  styleUrls: ['./json-editor-view.component.css']
})
export class JsonEditorViewComponent {
  title = 'MockServer';

  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.schema = this.schema;
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

    this.data = {
      "_index": "encounters",
      "_type": "encounter",
      "_id": "AV1stsDO5J77fbpnTxoE",
      "_version": 1,
      "found": true,
      "_source": {
        "url": "http://nuforc.org/webreports/132/S132660.html",
        "date_time": "2/15/17 20:00",
        "city": "Austin",
        "state": "NV",
        "shape": "Triangle",
        "duration": "3 minutes",
        "summary": "We saw a bright light in the southern sky.  Instantly, it changed to a triangle with 2 lights in each corner.",
        "posted_date": "2/17/17",
        "description": "We where driving down from Mount Callahan 20 mi N of Austin, NV, at 8pm.  First we saw a bright light in the southern sky.  Instantly, it changed to a triangle with 2 lights in each corner.  It was about 2000 yards away.  We stopped the truck &amp; got out to watch.  It kind of rotated around for about 30 seconds and in an instant, it changed to a much larger rectangle with about 30 lights around the parameter of it.  It was silent and remained completely still for a minute.It then just disappeared, and several seconds later a loud rushing air sound was above us for 10 to 15 seconds.  We could not see anything above us but the stars.  Then the sound seemed to travel away until we could not hear it any more.((ADDENDUM FROM WITNESS))Hi Peter,Yes,  it was last night.  I made a typo entering the data.  We were coming down from the mountain top after repairing a cellular site.  ((name deleted))((END ADDENDUM))"
      }
    };
  }

  private schema:any ={
    "definitions": {},
    "id": "http://example.com/example.json",
    "properties": {
      "_id": {
        "id": "/properties/_id",
        "type": "string"
      },
      "_index": {
        "id": "/properties/_index",
        "type": "string"
      },
      "_source": {
        "id": "/properties/_source",
        "properties": {
          "city": {
            "id": "/properties/_source/properties/city",
            "type": "string"
          },
          "date_time": {
            "id": "/properties/_source/properties/date_time",
            "type": "string"
          },
          "description": {
            "id": "/properties/_source/properties/description",
            "type": "string"
          },
          "duration": {
            "id": "/properties/_source/properties/duration",
            "type": "string"
          },
          "posted_date": {
            "id": "/properties/_source/properties/posted_date",
            "type": "string"
          },
          "shape": {
            "id": "/properties/_source/properties/shape",
            "type": "string"
          },
          "state": {
            "id": "/properties/_source/properties/state",
            "type": "string"
          },
          "summary": {
            "id": "/properties/_source/properties/summary",
            "type": "string"
          },
          "url": {
            "id": "/properties/_source/properties/url",
            "type": "string"
          }
        },
        "type": "object"
      },
      "_type": {
        "id": "/properties/_type",
        "type": "string"
      },
      "_version": {
        "id": "/properties/_version",
        "type": "integer"
      },
      "found": {
        "id": "/properties/found",
        "type": "boolean"
      }
    },
    "type": "object"
  };
}
