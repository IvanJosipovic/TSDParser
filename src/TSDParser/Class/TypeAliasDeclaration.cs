﻿namespace TSDParser.Class;

public class TypeAliasDeclaration : Node
{
    public Identifier Name { get; set; }

    public List<Node> Modifiers { get; set; }

    public List<TypeParameter>? TypeParameters { get; set; }

    public Node? Type { get; set; }

    public List<JSDoc>? JSDoc { get; set; }
}
