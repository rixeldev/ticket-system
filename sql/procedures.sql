-- Create a new ticket
CREATE OR REPLACE PROCEDURE create_ticket (
  p_title IN VARCHAR2,
  p_description IN CLOB,
  p_user_id IN NUMBER
) AS
BEGIN
  INSERT INTO tickets (title, description, created_by)
  VALUES (p_title, p_description, p_user_id);
END;
/

-- List tickets
CREATE OR REPLACE PROCEDURE get_tickets (
  p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM tickets ORDER BY created_at DESC;
END;
/
