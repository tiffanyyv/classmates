
export default function AppointmentContent (e) {
  const { zoomlink, title } = e.appointmentData

  return (
    <div>
      <div>Hey this is a test</div>
      <div>{zoomlink}</div>
    </div>
  );

}