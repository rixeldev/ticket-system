CREATE OR REPLACE TRIGGER trg_ticket_status
AFTER UPDATE OF status ON tickets
FOR EACH ROW
BEGIN
  INSERT INTO ticket_history (
    ticket_id,
    old_status,
    new_status
  ) VALUES (
    :OLD.ticket_id,
    :OLD.status,
    :NEW.status
  );
END;
/
