import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistMap } from './wishlist-map';

describe('WishlistMap', () => {
  let component: WishlistMap;
  let fixture: ComponentFixture<WishlistMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistMap],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
