using System;
using System.Collections.Generic;
using System.Text;
using TSDParser.Enums;

namespace TSDParser.Class
{
    public class ExpressionWithTypeArguments : Node
    {
        public SyntaxKind Kind => SyntaxKind.ExpressionWithTypeArguments;

        public Identifier Expression { get; set; }
    }
}
