import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildTableComponent } from './child-table-component';

describe('ChildTableComponent', () => {
  let component: ChildTableComponent;
  let fixture: ComponentFixture<ChildTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
