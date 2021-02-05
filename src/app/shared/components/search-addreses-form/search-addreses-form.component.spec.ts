import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAddresesFormComponent } from './search-addreses-form.component';

describe('SearchAddresesFormComponent', () => {
  let component: SearchAddresesFormComponent;
  let fixture: ComponentFixture<SearchAddresesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchAddresesFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAddresesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    pending();
    expect(component).toBeTruthy();
  });
});
