import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorViewComponent } from './json-editor-view.component';

describe('JsonEditorViewComponent', () => {
  let component: JsonEditorViewComponent;
  let fixture: ComponentFixture<JsonEditorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEditorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
