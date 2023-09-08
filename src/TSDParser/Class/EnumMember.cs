namespace TSDParser.Class;

public class EnumMember : Node
{
    public Identifier Name { get; set; }

    public Node Initializer { get; set; }

    public List<JSDoc>? JSDoc { get; set; }
}
