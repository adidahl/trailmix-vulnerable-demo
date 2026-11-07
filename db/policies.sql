create policy "trip access" on trips
  for all
  using (true)
  with check (true);

create policy "waypoints follow trip owner" on waypoints
  for all
  using (exists (select 1 from trips t where t.id = waypoints.trip_id and t.owner_id = auth.uid()))
  with check (exists (select 1 from trips t where t.id = waypoints.trip_id and t.owner_id = auth.uid()));

create policy "gear follows trip owner" on gear_items
  for all
  using (exists (select 1 from trips t where t.id = gear_items.trip_id and t.owner_id = auth.uid()));

create policy "photos owner only" on photos
  for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());
