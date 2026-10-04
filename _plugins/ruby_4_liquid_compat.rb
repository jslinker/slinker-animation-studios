# Liquid 4 still calls Ruby's removed object-taint APIs. Jekyll loads this
# compatibility shim before rendering when the site is built with Ruby 4+.
if RUBY_VERSION >= "4.0"
  class Object
    def tainted?
      false
    end

    def untaint
      self
    end
  end
end
