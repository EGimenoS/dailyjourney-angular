import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsModule } from '../search-results.module';
import { ResultsListComponent } from './results-list.component';

describe('ResultsListComponent', () => {
  let component: ResultsListComponent;
  let fixture: ComponentFixture<ResultsListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SearchResultsModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ResultsListComponent);
        component = fixture.componentInstance;
      });
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of travels', () => {});

  it('should display the first travel', () => {});
});
