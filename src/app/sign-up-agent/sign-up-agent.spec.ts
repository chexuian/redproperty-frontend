import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAgent } from './sign-up-agent';

describe('SignUpAgent', () => {
  let component: SignUpAgent;
  let fixture: ComponentFixture<SignUpAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpAgent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
