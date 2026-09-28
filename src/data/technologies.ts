import { TechFeature } from '../types/automotive';

export const TECH_FEATURES: TechFeature[] = [
  {
    id: 'ldvi',
    code: 'LDVI 2.0',
    title: 'Lamborghini Dinamica Veicolo Integrata',
    tagline: 'Predictive central intelligence for instantaneous vehicle dynamics.',
    overview: 'LDVI acts as the technological brain, collecting real-time acceleration, roll, pitch, yaw, and steering angle data at 200 Hz to calculate driver intent and configure torque distribution in milliseconds.',
    deepDive: 'By synthesizing input from feed-forward sensors and all-wheel steering actuators, LDVI does not merely react to loss of traction—it anticipates physical limits before they occur, giving the pilot surgical precision.',
    metrics: [
      { label: 'Sampling Rate', value: '200 Hz' },
      { label: 'Latency', value: '< 2.5 ms' },
      { label: 'Drive Modes', value: 'Strada · Sport · Corsa' },
    ],
  },
  {
    id: 'active-aero',
    code: 'ALA 2.0',
    title: 'Aerodinamica Lamborghini Attiva',
    tagline: 'Active downforce management and airflow vectoring without parasitic drag.',
    overview: 'Patented front splitters and dynamic internal rear wing air channels open and close electronically within 200 milliseconds to dynamically alternate between low-drag speed runs and maximum high-g cornering grip.',
    deepDive: 'In cornering maneuvers, ALA can stall the inner side of the rear wing while leaving the outer side at maximum angle of attack, creating an aerodynamic moment that pivots the supercar into the apex.',
    metrics: [
      { label: 'Aero Vectoring', value: 'Active Left / Right' },
      { label: 'Max Downforce', value: '415 kg @ 280 km/h' },
      { label: 'Actuator Time', value: '0.2 seconds' },
    ],
  },
  {
    id: 'carbon-monocoque',
    code: 'CFRP MONO',
    title: 'Forged Carbon Fiber Monofuselage',
    tagline: 'Aviation-grade composite architecture delivering extreme rigidity.',
    overview: '100% carbon fiber central tub forged under extreme pressure and temperature, bonded seamlessly with high-strength aeronautical aluminum subframes.',
    deepDive: 'Forged Composite technology allows complex 3D shapes to be molded in a single operation, eliminating weak join points and increasing torsional resistance to an astounding 46,000 Nm/degree.',
    metrics: [
      { label: 'Torsional Stiffness', value: '46,000 Nm/deg' },
      { label: 'Weight Reduction', value: '-25% vs steel' },
      { label: 'Tensile Strength', value: '3,800 MPa' },
    ],
  },
  {
    id: 'all-wheel-steering',
    code: '4WS',
    title: 'Dynamic All-Wheel Steering',
    tagline: 'Virtual wheelbase adaptation for hairpin agility and high-speed stability.',
    overview: 'At low speeds, rear wheels steer in counter-phase up to 3 degrees to reduce turning radius; at high speeds, they steer in-phase for laser-sharp stability during high-speed lane changes.',
    deepDive: 'Two electromechanical actuators on the rear axle respond in 15 milliseconds, effectively shortening the wheelbase by 250mm during city maneuvers and lengthening it on high-speed straights.',
    metrics: [
      { label: 'Max Rear Steer Angle', value: '± 3.0°' },
      { label: 'Turning Circle', value: '11.5 meters' },
      { label: 'Response Time', value: '15 ms' },
    ],
  },
  {
    id: 'adaptive-damping',
    code: 'MagneRide',
    title: 'Magnetorheological Adaptive Damping',
    tagline: 'Liquid magnetic suspension changing damping characteristics in microseconds.',
    overview: 'Damper fluid contains microscopic magnetic iron particles that align instantly in the presence of an electromagnetic coil, transitioning damping from supple touring comfort to track-stiff support.',
    deepDive: 'Unlike mechanical valve dampers, magnetorheological fluid has no moving valves to delay response. Continuous current modulation keeps body roll near zero even under 1.4g lateral loads.',
    metrics: [
      { label: 'Adjustment Cycle', value: '1,000 times/sec' },
      { label: 'Body Roll Reduction', value: '68%' },
      { label: 'Fluid Viscosity Shift', value: 'Sub-millisecond' },
    ],
  },
  {
    id: 'torque-vectoring',
    code: 'e-Vector',
    title: 'Electrified Torque Vectoring',
    tagline: 'Millisecond power bias across each independent wheel.',
    overview: 'Dual front axial flux electric motors deliver instant individual wheel torque, pulling the front end into apexes with zero hesitation and eliminating understeer entirely.',
    deepDive: 'Independent front drive motors eliminate heavy mechanical differentials while allowing regenerative braking on the inside front wheel while powering the outside wheel during full-throttle corner exits.',
    metrics: [
      { label: 'Torque Bias Range', value: '0 - 100% per side' },
      { label: 'Regen Power', value: 'Up to 140 kW' },
      { label: 'Apex Exit Speed', value: '+14% improvement' },
    ],
  },
];
