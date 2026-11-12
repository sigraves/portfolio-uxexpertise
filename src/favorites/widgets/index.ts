import type { ComponentType } from 'react';
import FlipCardDemo from './FlipCardDemo';
import AccordionDemo from './AccordionDemo';
import PrioritizationHotspotsDemo from './PrioritizationHotspotsDemo';
import InteractiveTabsDemo from './InteractiveTabsDemo';
import ExpandableCardsDemo from './ExpandableCardsDemo';
import SwipeableCardDeckDemo from './SwipeableCardDeckDemo';
import ComparisonCardsDemo from './ComparisonCardsDemo';
import ImpactEffortMatrixDemo from './ImpactEffortMatrixDemo';

export const widgetDemos: Record<string, ComponentType> = {
  'flip-cards': FlipCardDemo,
  'accordions': AccordionDemo,
  'prioritization-hotspots': PrioritizationHotspotsDemo,
  'interactive-tabs': InteractiveTabsDemo,
  'expandable-cards': ExpandableCardsDemo,
  'swipeable-card-deck': SwipeableCardDeckDemo,
  'comparison-cards': ComparisonCardsDemo,
  'impact-effort-matrix': ImpactEffortMatrixDemo,
};
