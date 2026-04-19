-- =====================================================
-- MealMath Seed Data (v1)
-- =====================================================

-- =========================
-- Recipes
-- =========================
INSERT INTO recipes (id, name, description, category, servings) VALUES
('r1','Pilchards on Toast','Tin fish served on toast','Breakfast',1),
('r2','Egg and Tomato Toast','Scrambled eggs with tomato','Breakfast',1),
('r3','Peanut Butter Banana Toast','PB and banana on toast','Breakfast',1),
('r4','Oats with Banana','Simple banana oats','Breakfast',1),
('r5','Yogurt Fruit Bowl','Yogurt with fruit and oats','Breakfast',1),

('r6','Chicken Rice Bowl','Chicken with rice','Lunch',2),
('r7','Tuna Mayo Sandwich','Tuna mixed with mayo','Lunch',1),
('r8','Egg Fried Rice','Rice stir fried with egg','Lunch',2),
('r9','Beans on Toast','Baked beans on toast','Lunch',1),
('r10','Chakalaka Chicken Wrap','Chicken with chakalaka wrap','Lunch',1),

('r11','Pilchard Rice Bowl','Rice with pilchards','Lunch',2),
('r12','Cheese Tomato Sandwich','Toasted cheese and tomato','Lunch',1),
('r13','Boerewors Roll','Boerewors in bread roll','Lunch',1),
('r14','Chicken Mayo Sandwich','Chicken mixed with mayo','Lunch',1),

('r15','Spaghetti Mince','Spaghetti with mince sauce','Dinner',3),
('r16','Pap and Chakalaka','Pap with chakalaka','Dinner',2),
('r17','Chicken and Pap','Grilled chicken with pap','Dinner',2),
('r18','Samp and Beans','Traditional samp and beans','Dinner',3),
('r19','Egg Veg Stir Fry','Egg stir fry with vegetables','Dinner',2),
('r20','Rice and Beans','Simple rice and beans bowl','Dinner',2),

('r21','Apple Peanut Butter','Apple slices with PB','Snack',1),
('r22','Boiled Eggs','Simple boiled eggs','Snack',1),
('r23','Banana Oat Smoothie','Banana and oat smoothie','Snack',1),
('r24','Yogurt Honey Snack','Yogurt with honey','Snack',1),
('r25','Peanut Raisin Mix','Peanuts and raisins snack','Snack',2);
-- =========================
-- Ingredients
-- =========================
INSERT INTO ingredients (id, name, unit_type) VALUES
('i1','Bread','count'),
('i2','Eggs','count'),
('i3','Tomato','count'),
('i4','Pilchards','mass'),
('i5','Peanut Butter','mass'),
('i6','Banana','count'),
('i7','Oats','mass'),
('i8','Yogurt','volume'),
('i9','Chicken','mass'),
('i10','Rice','mass'),
('i11','Tuna','mass'),
('i12','Mayonnaise','volume'),
('i13','Baked Beans','mass'),
('i14','Chakalaka','mass'),
('i15','Tortilla','count'),
('i16','Cheddar Cheese','mass'),
('i17','Boerewors','mass'),
('i18','Bread Roll','count'),
('i19','Minced Beef','mass'),
('i20','Spaghetti','mass'),
('i21','Pap Meal','mass'),
('i22','Samp','mass'),
('i23','Beans','mass'),
('i24','Mixed Vegetables','mass'),
('i25','Apple','count'),
('i26','Honey','volume'),
('i27','Peanuts','mass'),
('i28','Raisins','mass'),
('i29','Milk','volume');

-- =========================
-- Recipe Ingredients
-- =========================

INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit) VALUES

('ri1','r1','i4',155,'g'),
('ri2','r1','i1',2,'slice'),

('ri3','r2','i2',2,'pcs'),
('ri4','r2','i3',1,'pcs'),
('ri5','r2','i1',2,'slice'),

('ri6','r3','i1',2,'slice'),
('ri7','r3','i5',1,'tbsp'),
('ri8','r3','i6',1,'pcs'),

('ri9','r4','i7',50,'g'),
('ri10','r4','i6',1,'pcs'),
('ri11','r4','i29',200,'ml'),

('ri12','r5','i8',200,'ml'),
('ri13','r5','i6',1,'pcs'),
('ri14','r5','i7',30,'g'),

('ri15','r6','i10',150,'g'),
('ri16','r6','i9',120,'g'),

('ri17','r7','i11',100,'g'),
('ri18','r7','i12',1,'tbsp'),
('ri19','r7','i1',2,'slice'),

('ri20','r8','i10',150,'g'),
('ri21','r8','i2',2,'pcs'),
('ri22','r8','i24',80,'g'),

('ri23','r9','i13',200,'g'),
('ri24','r9','i1',2,'slice'),

('ri25','r10','i9',120,'g'),
('ri26','r10','i14',80,'g'),
('ri27','r10','i15',1,'pcs'),

('ri28','r11','i4',155,'g'),
('ri29','r11','i10',150,'g'),

('ri30','r12','i1',2,'slice'),
('ri31','r12','i16',40,'g'),
('ri32','r12','i3',1,'pcs'),

('ri33','r13','i17',150,'g'),
('ri34','r13','i18',1,'pcs'),

('ri35','r14','i9',120,'g'),
('ri36','r14','i12',1,'tbsp'),
('ri37','r14','i1',2,'slice'),

('ri38','r15','i20',200,'g'),
('ri39','r15','i19',200,'g'),

('ri40','r16','i21',200,'g'),
('ri41','r16','i14',150,'g'),

('ri42','r17','i21',200,'g'),
('ri43','r17','i9',150,'g'),

('ri44','r18','i22',200,'g'),
('ri45','r18','i23',150,'g'),

('ri46','r19','i2',2,'pcs'),
('ri47','r19','i24',100,'g'),

('ri48','r20','i10',150,'g'),
('ri49','r20','i23',150,'g'),

('ri50','r21','i25',1,'pcs'),
('ri51','r21','i5',1,'tbsp'),

('ri52','r22','i2',2,'pcs'),

('ri53','r23','i6',1,'pcs'),
('ri54','r23','i7',30,'g'),
('ri55','r23','i29',200,'ml'),

('ri56','r24','i8',200,'ml'),
('ri57','r24','i26',1,'tbsp'),

('ri58','r25','i27',80,'g'),
('ri59','r25','i28',40,'g');